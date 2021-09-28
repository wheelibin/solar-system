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
import { Easing, Tween, update as tweenUpdate } from "@tweenjs/tween.js";
import cloneDeep from "lodash/cloneDeep";

import { Entity } from "./entities/Entity";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

import { SolarSystemGenerator } from "./utils/SolarSystemGenerator";

import { Moon } from "./entities/Moon";
import { ClassM } from "./entities/ClassM";
import { Star } from "./entities/Star";
import { Earth } from "./entities/Earth";
import { EntityType, SolarSystem, SolarSystemEntity } from "./models/SolarSystem";
import { AsteroidBelt } from "./entities/AsteroidBelt";
import { EntityParams } from "./models/EntityParams";

const sunColour = 0xf7e096;
const animationDuration = 4000;

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
  private cameraLookAtTarget = new Vector3(0, 0, 0);
  private cameraPositionVector = new Vector3();
  private spaceTexture!: Texture;
  private gui!: GUI;
  private guiViewActionsFolder!: GUI;
  private guiPlanetsFolder!: GUI;
  private planetPositionVector = new Vector3();

  private ambientLight!: AmbientLight;
  private pointLight!: PointLight;

  private cameraReachedTarget!: boolean;

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
    showAsteroidBelts: true,
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
    this.cameraInitialPosition = [0, this.solarSystem.stars[0].radius * 6, this.solarSystem.stars[0].radius * 32];
    this.camera.position.set(...this.cameraInitialPosition);

    this.camera.lookAt(this.cameraLookAtTarget);

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

    const newSeedButton = this.gui.add(this.buttonHandlers, "newSeed").name("Generate new system");
    if (newSeedButton.domElement.parentElement) {
      newSeedButton.domElement.parentElement.id = "new-seed-button";
    }

    this.gui.add(this.options, "seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed);
    this.gui.add(this.options, "simulationSpeed", 0, 20, 0.1).name("Simulation Speed");
  }

  public init = (regenSolarSystem = true) => {
    this.showPlanetId = -1;

    if (this.onInitialising) {
      this.onInitialising();
    }

    this.gui.updateDisplay();
    this.clearScene();

    if (regenSolarSystem) {
      this.solarSystem = new SolarSystemGenerator(this.options.seed).generate();
    }

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
    // this.scene.add(axesHelper);

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

    const planets = this.bodies.filter((b) => b.params.entityType === EntityType.Planet);
    const star = this.bodies.filter((b) => b.params.entityType === EntityType.Star)[0];

    this.guiViewActionsFolder = this.gui.addFolder("View Options");
    this.guiViewActionsFolder.open();

    this.guiViewActionsFolder
      .add(this.options, "followPlanetName", [star.params.name, ...planets.map((p) => p.params.name)])
      .name("Centre of View")
      .onChange(this.onFollowPlanetNameChange);

    this.guiViewActionsFolder.add(this.options, "trueScale").name("True Scale").onChange(this.init);
    this.guiViewActionsFolder.add(this.options, "showOrbits").name("Orbits").onChange(this.toggleOrbits);
    this.guiViewActionsFolder.add(this.options, "showPlanetLabels").name("Labels");
    this.guiViewActionsFolder
      .add(this.options, "showAsteroidBelts")
      .name("Asteroid Belt")
      .onChange(this.toggleAsteroidBelts);
    this.guiViewActionsFolder.add(this.options, "showStats").name("Stats").onChange(this.handleShowStatsChange);

    this.guiPlanetsFolder = this.gui.addFolder("Planets");
    this.guiPlanetsFolder.open();
    this.guiPlanetsFolder.add(this.buttonHandlers, "resetView").name("Reset View");
    for (let index = 0; index < planets.length; index++) {
      const planet = planets[index];
      this.guiPlanetsFolder.add(planet, "show").name(`#${index + 1}: ${planet.params.name}`);
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
        this.options.showPlanetLabels && this.showPlanetId !== body.params.id
      );
    });

    if (this.options.showStats) {
      this.stats.update();
    }

    if (this.showPlanetId > -1) {
      const planet = this.bodies.find((b) => b.params.id === this.showPlanetId);

      if (planet && this.cameraReachedTarget) {
        planet.sphere.getWorldPosition(this.planetPositionVector);
        const { x, y, z } = this.planetPositionVector;
        this.camera.position.set(x + planet.radius * 5, y, z + planet.radius * 10);
        this.cameraLookAtTarget.set(x, y, z);
        this.camera.lookAt(this.cameraLookAtTarget);
      }
    } else {
      if (this.options.followPlanetName !== "Star 1") {
        const planet = this.bodies.find((b) => b.params.name === this.options.followPlanetName);
        if (planet) {
          planet.sphere.getWorldPosition(this.planetPositionVector);
          const { x, y, z } = this.planetPositionVector;
          this.orbitControls.target.set(x, y, z);
          this.orbitControls.update();
        }
      }
    }

    tweenUpdate();
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
      this.cameraPositionVector.set(...this.cameraInitialPosition);
    } else {
      this.cameraPositionVector.set(...this.cameraInitialPosition).divideScalar(500);
    }

    // animate camera position
    new Tween(this.camera.position)
      .to(this.cameraPositionVector)
      .duration(animationDuration)
      .easing(Easing.Quintic.InOut)
      .start();

    //animate camera lookAt
    new Tween(this.cameraLookAtTarget)
      .to(new Vector3(0, 0, 0))
      .duration(animationDuration)
      .easing(Easing.Quintic.InOut)
      .onUpdate(() => this.camera.lookAt(this.cameraLookAtTarget))
      .start();

    if (this.onSelectPlanet) {
      this.onSelectPlanet(undefined);
    }
    this.orbitControls.update();
  };

  private handleShowStatsChange = () => {
    if (this.options.showStats) {
      this.stats.dom.style.display = "initial";
    } else {
      this.stats.dom.style.display = "none";
    }
  };

  private handleShowPlanet = (id: number) => {
    this.showPlanetId = id;

    const planet = this.bodies.find((b) => b.params.id === this.showPlanetId);
    if (planet) {
      planet.sphere.getWorldPosition(this.planetPositionVector);
      const { x, y, z } = this.planetPositionVector;
      const target = { x: x + planet.radius * 5, y, z: z + planet.radius * 10 };

      this.cameraReachedTarget = false;

      // animate camera position
      const tween = new Tween(this.camera.position)
        .to(target)
        .duration(animationDuration)
        .easing(Easing.Quintic.InOut)
        .start()
        .onUpdate(() => {
          planet.sphere.getWorldPosition(this.planetPositionVector);
          const { x, y, z } = this.planetPositionVector;
          const target = { x: x + planet.radius * 5, y, z: z + planet.radius * 10 };
          tween.to(target);
        })
        .onComplete(() => {
          this.cameraReachedTarget = true;
        });

      //animate camera lookAt
      new Tween(this.cameraLookAtTarget)
        .to(this.planetPositionVector)
        .duration(animationDuration)
        .easing(Easing.Cubic.Out)
        .onUpdate(() => this.camera.lookAt(this.cameraLookAtTarget))
        .start();
    }

    if (this.onSelectPlanet) {
      const planet = this.solarSystem.stars[0].satellites.find((p) => p.id === id) as SolarSystemEntity;
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

  private toggleAsteroidBelts = () => {
    const abs = this.bodies.filter((b) => b.params.entityType === EntityType.AsteroidBelt);
    for (const ab of abs) {
      ab.entity.visible = !ab.entity.visible;
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

      const starEntity = new Star(radius, {
        ...star,
        colour: new Color(0xffca20),
        orbitRadius: orbitRadius,
        orbitSpeed: orbitSpeed,
      });
      await starEntity.create();
      this.bodies.push(starEntity);
      this.scene.add(starEntity.entity);

      for (let planetIndex = 0; planetIndex < star.satellites.length; planetIndex++) {
        const starSatellite = star.satellites[planetIndex];

        const radius = starSatellite.radius * viewScale;
        const orbitRadius = starSatellite.orbitRadius * viewScale;
        const orbitSpeed = starSatellite.orbitSpeed * viewScale;

        const orbitEntity = this.bodies.find((b) => b.params.id === starSatellite.orbitEntityId) as Entity;

        if (starSatellite.entityType === EntityType.Planet) {
          const planetParams: EntityParams = {
            ...starSatellite,
            orbitEntity: orbitEntity,
            orbitRadius: orbitRadius,
            orbitSpeed: orbitSpeed,
            hasLabel: true,
            onShow: this.handleShowPlanet,
          };

          const planetEntity = planetIndex === 2 ? new Earth(radius, planetParams) : new ClassM(radius, planetParams);
          await planetEntity.create();

          for (const moon of starSatellite.satellites) {
            const radius = moon.radius * viewScale;
            const orbitRadius = moon.orbitRadius * viewScale;
            const orbitSpeed = moon.orbitSpeed * viewScale;

            const orbitEntity = planetEntity;

            const moonEntity = new Moon(radius, {
              ...moon,
              colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
              orbitEntity: orbitEntity,
              orbitRadius: orbitRadius,
              orbitSpeed: orbitSpeed,
            });
            await moonEntity.create();
            this.bodies.push(moonEntity);
            // add the moon to the planet (so it follows the planet's orbit)
            planetEntity.entity.add(moonEntity.entity);
          }

          this.bodies.push(planetEntity);
          this.scene.add(planetEntity.entity);
        } else if (starSatellite.entityType === EntityType.AsteroidBelt) {
          const asteroidBelt = new AsteroidBelt(starSatellite.radius * 4, {
            ...starSatellite,
            colour: new Color(0.8, 0.8, 0.8),
            orbitRadius: orbitRadius,
            orbitEntity: starEntity,
            orbitSpeed: orbitSpeed,
          });

          await asteroidBelt.create();
          this.bodies.push(asteroidBelt);
          this.scene.add(asteroidBelt.entity);
        }
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
      const starRadius = star.radius * viewScale;
      const orbitRadius = star.orbitRadius * viewScale;
      const orbitSpeed = star.orbitSpeed * viewScale;

      const starEntity = new Star(starRadius, {
        ...star,
        orbitRadius,
        orbitSpeed,
        colour: new Color(0xffca20),
      });
      await starEntity.create();
      this.bodies.push(starEntity);
      this.scene.add(starEntity.entity);

      const starSatellites = cloneDeep(star.satellites);

      // increase the radiuses (and moons)
      for (const planet of starSatellites.filter((s) => s.entityType === EntityType.Planet)) {
        planet.radius *= 4;
        for (const moon of planet.satellites) {
          moon.radius *= 2;
          moon.orbitSpeed *= 2;
          moon.orbitRadius *= 2;
        }
      }

      // compress the orbits
      for (let i = 0; i < starSatellites.length; i++) {
        const starSatellite = starSatellites[i];

        const planetMoonRadius = starSatellite.satellites.length
          ? starSatellite.satellites[starSatellite.satellites.length - 1].orbitRadius
          : 0;

        if (i === 0) {
          starSatellite.orbitRadius = star.radius * 2 + planetMoonRadius * 2;
        } else {
          const prevStarSatellite = starSatellites[i - 1];
          const prevPlanetMoonRadius = prevStarSatellite.satellites.length
            ? prevStarSatellite.satellites[prevStarSatellite.satellites.length - 1].orbitRadius
            : prevStarSatellite.orbitRadius * 0.2;
          starSatellite.orbitRadius = prevStarSatellite.orbitRadius + prevPlanetMoonRadius + planetMoonRadius;

          // Extend the orbit slightly based on the actual orbit sizes
          const r =
            (starSatellite.orbitRadius - prevStarSatellite.orbitRadius) /
            star.satellites[star.satellites.length - 1].orbitRadius;

          starSatellite.orbitRadius += r * starSatellite.orbitRadius * 0.5;
        }
      }

      for (let planetIndex = 0; planetIndex < starSatellites.length; planetIndex++) {
        const starSatellite = starSatellites[planetIndex];

        const radius = starSatellite.radius * viewScale;
        const orbitRadius = starSatellite.orbitRadius * viewScale;
        const orbitSpeed = starSatellite.orbitSpeed * viewScale;

        const orbitEntity = this.bodies.find((b) => b.params.id === starSatellite.orbitEntityId) as Entity;

        if (starSatellite.entityType === EntityType.Planet) {
          const planetParams: EntityParams = {
            ...starSatellite,
            orbitEntity: orbitEntity,
            orbitRadius: orbitRadius,
            orbitSpeed: orbitSpeed,
            hasLabel: true,
            onShow: this.handleShowPlanet,
          };

          const planetEntity = planetIndex === 2 ? new Earth(radius, planetParams) : new ClassM(radius, planetParams);
          await planetEntity.create();

          for (const moon of starSatellite.satellites) {
            const radius = moon.radius * viewScale;
            const orbitRadius = moon.orbitRadius * viewScale;
            const orbitSpeed = moon.orbitSpeed * viewScale * 3; // 3 = fudge factor to get moons moving
            const orbitEntity = planetEntity;

            const moonEntity = new Moon(radius, {
              ...moon,
              colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
              orbitEntity: orbitEntity,
              orbitRadius: orbitRadius,
              orbitSpeed: orbitSpeed,
            });
            await moonEntity.create();
            this.bodies.push(moonEntity);
            // add the moon to the planet (so it follows the planet's orbit)
            planetEntity.entity.add(moonEntity.entity);
          }

          this.bodies.push(planetEntity);
          this.scene.add(planetEntity.entity);
        } else if (starSatellite.entityType === EntityType.AsteroidBelt) {
          const asteroidBelt = new AsteroidBelt(starSatellite.radius * viewScale, {
            ...starSatellite,
            colour: new Color(0.5, 0.5, 0.5),
            orbitRadius: orbitRadius,
            orbitEntity: starEntity,
            orbitSpeed: orbitSpeed,
            itemCount: Number(starSatellite.itemCount) * 0.2,
          });

          await asteroidBelt.create();
          this.bodies.push(asteroidBelt);
          this.scene.add(asteroidBelt.entity);
        }
      }
    }
  };
}
