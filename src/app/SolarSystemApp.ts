import {
  AmbientLight,
  // AxesHelper,
  Camera,
  Clock,
  Color,
  CubeTextureLoader,
  MathUtils,
  PerspectiveCamera,
  PointLight,
  Scene,
  Texture,
  Vector3,
  WebGLRenderer,
} from "three";
import cloneDeep from "lodash/cloneDeep";

import { Entity, EntityParams, EntityType } from "./entities/Entity";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

import { SolarSystemGenerator } from "./utils/SolarSystemGenerator";

import { Moon } from "./entities/Moon";
import { ClassM } from "./entities/ClassM";
import { Star } from "./entities/Star";
import { Earth } from "./entities/Earth";
import { SolarSystem, SolarSystemEntity } from "./models/SolarSystem";

const sunColour = 0xf7e096;

export class SolarSystemApp {
  private solarSystem!: SolarSystem;

  private isRunning = false;
  private scene!: Scene;
  private camera!: Camera;
  private clock = new Clock();
  private bodies: Entity[] = [];
  private renderer!: WebGLRenderer;
  private orbitControls!: OrbitControls;
  private stats!: Stats;
  private showPlanetId!: number;
  private cameraInitialPosition!: [number, number, number];
  private spaceTexture!: Texture;
  private gui!: GUI;
  private guiViewActionsFolder!: GUI;
  private guiPlanetsFolder!: GUI;
  private planetPositionVector = new Vector3();

  private ambientLight!: AmbientLight;
  private pointLight!: PointLight;

  // events
  public onInitialising!: () => void;
  public onInitialised!: () => void;
  public onSelectPlanet!: (planet?: SolarSystemEntity) => void;

  private options = {
    seed: 982174,
    simulationSpeed: 3,
    showOrbits: true,
    followPlanetName: "Star 1",
    trueScale: false,
    showPlanetLabels: false,
    showStats: true,
  };

  private buttonHandlers = {
    resetView: () => {
      this.resetView();
    },
    newSeed: () => {
      this.options.seed = MathUtils.randInt(100000, 999999);
      this.init();
    },
    changeSeed: () => {
      this.init();
    },
  };

  constructor() {
    this.solarSystem = new SolarSystemGenerator(this.options.seed).generate();

    this.scene = new Scene();
    this.scene.background = new Color().setHex(0x000000);

    const loader = new CubeTextureLoader();
    this.spaceTexture = loader.load([
      "assets/kurt/space_ft.png",
      "assets/kurt/space_bk.png",
      "assets/kurt/space_up.png",
      "assets/kurt/space_dn.png",
      "assets/kurt/space_rt.png",
      "assets/kurt/space_lf.png",
    ]);
    this.scene.background = this.spaceTexture;

    // Camera
    this.camera = new Camera();
    this.camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 50, 1e10);
    this.cameraInitialPosition = [0, this.solarSystem.stars[0].radius * 6, this.solarSystem.stars[0].radius * 30];
    this.camera.position.set(...this.cameraInitialPosition);

    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Controls
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.update();

    // Stats
    this.stats = new (Stats as any)();
    document.body.appendChild(this.stats.dom);

    // UI
    this.gui = new GUI();
    this.gui.width = 300;

    this.gui.add(this.buttonHandlers, "newSeed").name("New Seed");
    this.gui.add(this.options, "seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed);
    this.gui.add(this.options, "simulationSpeed", 0, 20, 0.1).name("Simulation Speed");
  }

  public init = () => {
    this.showPlanetId = -1;

    if (this.onInitialising) {
      this.onInitialising();
    }

    this.gui.updateDisplay();
    this.clearScene();
    this.solarSystem = new SolarSystemGenerator(this.options.seed).generate();

    // default to showing labels when in true scale (and vice-versa)
    this.options.showPlanetLabels = this.options.trueScale;

    this._init().then(() => {
      this.resetView();
      this.animate();
      if (this.onInitialised) {
        this.onInitialised();
      }
    });
  };

  private _init = async () => {
    this.showPlanetId = -1;

    // var axesHelper = new AxesHelper(5000);
    // scene.add(axesHelper);

    // Lighting
    this.pointLight = new PointLight(sunColour, 1);

    let ambientLightIntensity = 0.15;
    if (this.options.trueScale) {
      // star
      this.pointLight.power = 1.05e14; // lumens
      this.renderer.physicallyCorrectLights = true;
      this.pointLight.decay = 2;
      // needs slightly more ambient light because planets aren't illuminated as much
      ambientLightIntensity = 0.3;
    } else {
      this.pointLight.decay = 1;
      this.renderer.physicallyCorrectLights = false;
    }
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);

    this.ambientLight = new AmbientLight(0xffffff, ambientLightIntensity);
    this.scene.add(this.ambientLight);

    if (this.options.trueScale) {
      await this.renderRealisticSolarSystem();
      this.camera.position.set(...this.cameraInitialPosition);
    } else {
      await this.renderSolarSystem();
      this.camera.position.set(...this.cameraInitialPosition).divideScalar(500);
    }

    const planets = this.bodies.filter((b) => b.entityType === EntityType.Planet);
    const star = this.bodies.filter((b) => b.entityType === EntityType.Star)[0];

    this.guiViewActionsFolder = this.gui.addFolder("View Options");
    this.guiViewActionsFolder.open();

    this.guiViewActionsFolder
      .add(this.options, "followPlanetName", [star.name, ...planets.map((p) => p.name)])
      .name("Centre of View")
      .onChange(this.onFollowPlanetNameChange);

    this.guiViewActionsFolder.add(this.options, "trueScale").name("True Scale").onChange(this.init);
    this.guiViewActionsFolder.add(this.options, "showOrbits").name("Orbits").onChange(this.toggleOrbits);
    this.guiViewActionsFolder.add(this.options, "showPlanetLabels").name("Labels");
    this.guiViewActionsFolder.add(this.options, "showStats").name("Stats");

    this.guiPlanetsFolder = this.gui.addFolder("Planets");
    this.guiPlanetsFolder.open();
    this.guiPlanetsFolder.add(this.buttonHandlers, "resetView").name("Reset View");
    for (let index = 0; index < planets.length; index++) {
      const planet = planets[index];
      this.guiPlanetsFolder.add(planet, "show").name(`#${index + 1}: ${planet.name}`);
    }

    this.isRunning = true;
  };

  public animate = () => {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(this.animate);

    this.bodies.forEach((body) => {
      body.animate(
        this.clock,
        this.options.simulationSpeed / 2,
        this.camera,
        this.options.showPlanetLabels && this.showPlanetId !== body.id
      );
    });

    if (this.options.showStats) {
      this.stats.dom.style.display = "initial";
      this.stats.update();
    } else {
      this.stats.dom.style.display = "none";
    }

    if (this.showPlanetId > -1) {
      const planet = this.bodies.find((b) => b.id === this.showPlanetId);
      if (planet) {
        planet.sphere.getWorldPosition(this.planetPositionVector);
        const { x, y, z } = this.planetPositionVector;
        this.camera.position.set(x + planet.radius * 5, y, z + planet.radius * 10);
        this.camera.lookAt(x, y, z);
      }
    } else {
      if (this.options.followPlanetName !== "Star 1") {
        const planet = this.bodies.find((b) => b.name === this.options.followPlanetName);
        if (planet) {
          planet.sphere.getWorldPosition(this.planetPositionVector);
          const { x, y, z } = this.planetPositionVector;
          this.orbitControls.target.set(x, y, z);
          this.orbitControls.update();
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  private clearScene = () => {
    this.isRunning = false;

    try {
      this.gui.removeFolder(this.guiViewActionsFolder);
      this.gui.removeFolder(this.guiPlanetsFolder);
      this.guiViewActionsFolder.destroy();
    } catch (error) {}

    this.ambientLight?.dispose();
    this.pointLight?.dispose();

    for (const body of this.bodies) {
      body.dispose();
    }
    this.bodies = [];
    this.scene.clear();

    this.renderer.render(this.scene, this.camera);
  };

  private resetView = () => {
    this.showPlanetId = -1;

    if (this.options.trueScale) {
      this.camera.position.set(...this.cameraInitialPosition);
    } else {
      this.camera.position.set(...this.cameraInitialPosition).divideScalar(500);
    }

    if (this.onSelectPlanet) {
      this.onSelectPlanet(undefined);
    }
    this.orbitControls.update();
  };

  private handleShowPlanet = (id: number) => {
    this.showPlanetId = id;

    if (this.onSelectPlanet) {
      const planet = this.solarSystem.planets.find((p) => p.id === id) as SolarSystemEntity;
      this.onSelectPlanet(planet);
    }
  };

  private toggleOrbits = () => {
    for (const body of this.bodies) {
      if (body.orbit) {
        body.orbit.visible = !body.orbit.visible;
      }
    }
  };

  /**
   * Might have to rework this if multi-star systems are added
   * but for now it saves updating the orbit controls each render frame if we're just looking at the star
   */
  private onFollowPlanetNameChange = () => {
    if (this.options.followPlanetName === "Star 1") {
      this.orbitControls.target.set(0, 0, 0);
      this.orbitControls.update();
    }
  };

  /**
   * Renders a 1000th scale model of the solar system
   */
  private renderRealisticSolarSystem = async () => {
    // scale radiuses and speeds down to displayable proportions
    const viewScale = 1 / 1000;

    for (const star of this.solarSystem.stars) {
      const radius = star.radius * viewScale;
      const orbitRadius = star.orbitRadius * viewScale;
      const orbitSpeed = star.orbitSpeed * viewScale;

      const starEntity = new Star(star.id, star.name, EntityType.Star, radius, {
        baseSeed: star.seed,
        position: star.position ? new Vector3(...star.position) : new Vector3(0, 0, 0),
        colour: new Color(0xffca20),
        orbitEntity: false,
        orbitRadius: orbitRadius,
        orbitDirection: star.orbitDirection,
        orbitSpeed: orbitSpeed,
        orbitInclanation: star.orbitInclanation,
        orbitStartPosition: star.orbitStartPosition,
        spinSpeed: star.spinSpeed,
        spinDirection: star.spinDirection,
      });
      await starEntity.create();
      this.bodies.push(starEntity);
      this.scene.add(starEntity.entity);

      for (let planetIndex = 0; planetIndex < this.solarSystem.planets.length; planetIndex++) {
        const planet = this.solarSystem.planets[planetIndex];

        const radius = planet.radius * viewScale;
        const orbitRadius = planet.orbitRadius * viewScale;
        const orbitSpeed = planet.orbitSpeed * viewScale;

        const orbitEntity = this.bodies.find((b) => b.id === planet.orbitEntityId) as Entity;

        const planetParams: EntityParams = {
          baseSeed: planet.seed,
          position: planet.position ? new Vector3(...planet.position) : orbitEntity.entity.position,
          terrainHeight: planet.terrainHeight,
          orbitEntity: orbitEntity,
          orbitRadius: orbitRadius,
          orbitDirection: planet.orbitDirection,
          orbitSpeed: orbitSpeed,
          orbitInclanation: planet.orbitInclanation,
          orbitStartPosition: planet.orbitStartPosition,
          spinSpeed: planet.spinSpeed,
          spinDirection: planet.spinDirection,
          // positionInSystem: planet.positionInSystem,
          hasLabel: true,
          onShow: this.handleShowPlanet,
        };

        const planetEntity =
          planetIndex === 2
            ? new Earth(planet.id, planet.name, EntityType.Planet, radius, planetParams)
            : new ClassM(planet.id, planet.name, EntityType.Planet, radius, planetParams);
        await planetEntity.create();

        for (const moon of planet.moons) {
          const radius = moon.radius * viewScale;
          const orbitRadius = moon.orbitRadius * viewScale;
          const orbitSpeed = moon.orbitSpeed * viewScale;

          const orbitEntity = planetEntity;

          const moonEntity = new Moon(moon.id, moon.name, EntityType.Moon, radius, {
            baseSeed: moon.seed,
            position: moon.position ? new Vector3(...moon.position) : orbitEntity.entity.position,
            colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
            terrainHeight: moon.terrainHeight,
            orbitEntity: orbitEntity,
            orbitRadius: orbitRadius,
            orbitDirection: moon.orbitDirection,
            orbitSpeed: orbitSpeed,
            orbitInclanation: moon.orbitInclanation,
            orbitStartPosition: moon.orbitStartPosition,
            spinSpeed: moon.spinSpeed,
            spinDirection: planet.spinDirection,
          });
          await moonEntity.create();
          this.bodies.push(moonEntity);
          // add the moon to the planet (so it follows the planet's orbit)
          planetEntity.entity.add(moonEntity.entity);
        }

        this.bodies.push(planetEntity);
        this.scene.add(planetEntity.entity);
      }
    }
  };

  /**
   * Renders a view friendly, compressed version of the solar system
   */
  private renderSolarSystem = async () => {
    // scale radiuses and speeds down to displayable proportions
    const viewScale = 1 / 1000;

    for (const star of this.solarSystem.stars) {
      const starRadius = star.radius * viewScale * 4;
      const orbitRadius = star.orbitRadius * viewScale;
      const orbitSpeed = star.orbitSpeed * viewScale;

      const starEntity = new Star(star.id, star.name, EntityType.Star, starRadius, {
        baseSeed: star.seed,
        position: star.position ? new Vector3(...star.position) : new Vector3(0, 0, 0),
        colour: new Color(0xffca20),
        orbitEntity: false,
        orbitRadius: orbitRadius,
        orbitDirection: star.orbitDirection,
        orbitSpeed: orbitSpeed,
        orbitInclanation: star.orbitInclanation,
        orbitStartPosition: star.orbitStartPosition,
        spinSpeed: star.spinSpeed,
        spinDirection: star.spinDirection,
      });
      await starEntity.create();
      this.bodies.push(starEntity);
      this.scene.add(starEntity.entity);

      const planets = cloneDeep(this.solarSystem.planets);

      // increase the radiuses (and moons to match)
      for (const planet of planets) {
        const scale = 4;
        planet.radius *= scale;
        for (const moon of planet.moons) {
          moon.radius *= scale;
          moon.orbitSpeed *= scale;
        }
      }

      // compress the orbits
      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const planetMoonRadius = planet.moons[planet.moons.length - 1].orbitRadius;

        if (i === 0) {
          planet.orbitRadius = star.radius * 2 + planetMoonRadius * 2;
        } else {
          const prevPlanet = planets[i - 1];
          const prevPlanetMoonRadius = prevPlanet.moons[prevPlanet.moons.length - 1].orbitRadius;
          planet.orbitRadius = prevPlanet.orbitRadius + prevPlanetMoonRadius + planetMoonRadius;

          // Extend the orbit slightly based on the actual orbit sizes
          const r =
            (this.solarSystem.planets[i].orbitRadius - this.solarSystem.planets[i - 1].orbitRadius) /
            this.solarSystem.planets[this.solarSystem.planets.length - 1].orbitRadius;

          planet.orbitRadius += r * planet.orbitRadius * 0.5;
        }
      }

      for (let planetIndex = 0; planetIndex < planets.length; planetIndex++) {
        const planet = planets[planetIndex];

        const radius = planet.radius * viewScale;
        const orbitRadius = planet.orbitRadius * viewScale;
        const orbitSpeed = planet.orbitSpeed * viewScale;

        const orbitEntity = this.bodies.find((b) => b.id === planet.orbitEntityId) as Entity;

        const planetParams: EntityParams = {
          baseSeed: planet.seed,
          position: planet.position ? new Vector3(...planet.position) : orbitEntity.entity.position,
          terrainHeight: planet.terrainHeight,
          orbitEntity: orbitEntity,
          orbitRadius: orbitRadius,
          orbitDirection: planet.orbitDirection,
          orbitSpeed: orbitSpeed,
          orbitInclanation: planet.orbitInclanation,
          orbitStartPosition: planet.orbitStartPosition,
          spinSpeed: planet.spinSpeed,
          spinDirection: planet.spinDirection,
          hasLabel: true,
          onShow: this.handleShowPlanet,
        };

        const planetEntity =
          planetIndex === 2
            ? new Earth(planet.id, planet.name, EntityType.Planet, radius, planetParams)
            : new ClassM(planet.id, planet.name, EntityType.Planet, radius, planetParams);
        await planetEntity.create();

        for (const moon of planet.moons) {
          const radius = moon.radius * viewScale;
          const orbitRadius = moon.orbitRadius * viewScale;
          const orbitSpeed = moon.orbitSpeed * viewScale * 4; // 4 = fudge factor to get moons moving
          const orbitEntity = planetEntity;

          const moonEntity = new Moon(moon.id, moon.name, EntityType.Moon, radius, {
            baseSeed: moon.seed,
            position: moon.position ? new Vector3(...moon.position) : orbitEntity.entity.position,
            colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
            terrainHeight: moon.terrainHeight,
            orbitEntity: orbitEntity,
            orbitRadius: orbitRadius,
            orbitDirection: moon.orbitDirection,
            orbitSpeed: orbitSpeed,
            orbitInclanation: moon.orbitInclanation,
            orbitStartPosition: moon.orbitStartPosition,
            spinSpeed: moon.spinSpeed,
            spinDirection: planet.spinDirection,
          });
          await moonEntity.create();
          this.bodies.push(moonEntity);
          // add the moon to the planet (so it follows the planet's orbit)
          planetEntity.entity.add(moonEntity.entity);
        }

        this.bodies.push(planetEntity);
        this.scene.add(planetEntity.entity);
      }
    }
  };
}
