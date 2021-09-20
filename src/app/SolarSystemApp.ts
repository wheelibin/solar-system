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
import { Entity, EntityParams, EntityType } from "./planets/Entity";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

import { SolarSystem, SolarSystemGenerator } from "./SolarSystemGenerator";
import { Moon } from "./planets/Moon";
import { ClassM } from "./planets/ClassM";
import { Sun } from "./planets/Sun";
import { Earth } from "./planets/Earth";

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
  // private planetInfoBox: HTMLElement;

  private ambientLight!: AmbientLight;
  private pointLight!: PointLight;

  // events
  public onInitialising!: () => void;
  public onInitialised!: () => void;

  private options = {
    seed: 2,
    simulationSpeed: 3,
    showOrbits: true,
    followPlanetName: "Sun 1",
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
    this.solarSystem = new SolarSystemGenerator().generate(this.options.seed);

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
    this.camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 50, 1e7);
    this.cameraInitialPosition = [0, this.solarSystem.suns[0].radius * 6, this.solarSystem.suns[0].radius * 20];
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

    // Stats
    this.stats = new (Stats as any)();
    document.body.appendChild(this.stats.dom);

    // UI
    this.gui = new GUI();
    this.gui.width = 300;

    this.gui.add(this.buttonHandlers, "newSeed").name("New Seed");
    this.gui.add(this.options, "seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed);
    this.gui.add(this.options, "simulationSpeed", 0, 20, 0.1).name("Simulation Speed");

    // this.planetInfoBox = document.createElement("div");
    // this.planetInfoBox.className = "planet-info-box";
    // this.planetInfoBox.innerHTML = `
    // <h1 class='planet-info-box__name'></h1>
    // <div class='planet-info-box__prop-container'>

    // </div>
    // `;
    // document.body.appendChild(this.planetInfoBox);
  }

  public init = () => {
    if (this.onInitialising) {
      this.onInitialising();
    }

    this.gui.updateDisplay();
    this.clearScene();
    this.solarSystem = new SolarSystemGenerator().generate(this.options.seed);

    this.resetView();

    this._init().then(() => {
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
    this.ambientLight = new AmbientLight(0xffffff, 0.15);
    this.scene.add(this.ambientLight);

    this.pointLight = new PointLight(sunColour, 1);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);

    await this.createSolarSystem();

    const planets = this.bodies.filter((b) => b.entityType === EntityType.Planet);
    const sun = this.bodies.filter((b) => b.entityType === EntityType.Sun)[0];

    this.guiViewActionsFolder = this.gui.addFolder("View Actions");
    this.guiViewActionsFolder.open();
    this.guiViewActionsFolder.add(this.options, "showOrbits").name("Show Orbits").onChange(this.toggleOrbits);
    this.guiViewActionsFolder
      .add(this.options, "followPlanetName", [sun.name, ...planets.map((p) => p.name)])
      .name("Centre of View");
    this.guiViewActionsFolder.add(this.buttonHandlers, "resetView").name("Reset View");

    for (const planet of planets) {
      this.guiViewActionsFolder.add(planet, "show").name(planet.name || "A Planet");
    }

    this.isRunning = true;
  };

  public animate = () => {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(this.animate);

    this.bodies.forEach((body) => {
      body.animate(this.clock, this.options.simulationSpeed / 5);
    });

    this.orbitControls.update();
    this.stats.update();

    if (this.showPlanetId > -1) {
      const planet = this.bodies.find((b) => b.id === this.showPlanetId);
      if (planet) {
        const pos = new Vector3();
        planet.sphere.getWorldPosition(pos);
        this.camera.position.set(pos.x + planet.radius * 2, pos.y + planet.radius * 2, pos.z + planet.radius * 8);
        this.camera.lookAt(pos.x, pos.y, pos.z);
      }
    } else {
      const planet = this.bodies.find((b) => b.name === this.options.followPlanetName);
      if (planet) {
        const pos = new Vector3();
        planet.sphere.getWorldPosition(pos);
        this.orbitControls.target.set(pos.x, pos.y, pos.z);
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  private clearScene = () => {
    this.isRunning = false;

    try {
      this.gui.removeFolder(this.guiViewActionsFolder);
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
    this.camera.position.set(...this.cameraInitialPosition);
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  };

  private handleShowPlanet = (id: number) => {
    this.showPlanetId = id;
    // const ssPlanet = this.solarSystem.planets.find((p) => p.id === id) as SolarSystemEntity;

    // document.body.getElementsByClassName("planet-info-box__name")[0].textContent = ssPlanet.name;

    // let html = "";
    // [["Radius", ssPlanet.radius]].forEach((prop: any) => {
    //   html += `<p class='planet-info-box__prop-name'>${prop[0]}</p>`;
    //   html += `<p class='planet-info-box__prop-value'>${prop[1]}</p>`;
    // });

    // document.body.getElementsByClassName("planet-info-box__prop-container")[0].innerHTML = html;
  };

  private toggleOrbits = () => {
    for (const body of this.bodies) {
      if (body.orbit) {
        body.orbit.opacity = body.orbit.opacity === 0 ? 0.5 : 0;
      }
    }
  };

  private createSolarSystem = async () => {
    const maxPlanetOrbitSpeed = 0.005; // Random.getRandomFloat(0.001, 0.005, [this.options.seed, seedIndexes.orbitSpeed]);
    const maxMoonOrbitSpeed = 0.005; // Random.getRandomFloat(0.001, 0.005, [this.options.seed, seedIndexes.orbitSpeed]);

    for (const sun of this.solarSystem.suns) {
      const sunEntity = new Sun(sun.id, sun.name, EntityType.Sun, sun.radius, {
        baseSeed: sun.seed,
        position: sun.position ? new Vector3(...sun.position) : new Vector3(0, 0, 0),
        colour: new Color(0xffca20),
        orbitEntity: false,
        orbitRadius: sun.orbitRadius,
        orbitDirection: sun.orbitDirection,
        orbitSpeed: sun.orbitSpeed,
        orbitInclanation: sun.orbitInclanation,
        orbitStartPosition: sun.orbitStartPosition,
        spinSpeed: sun.spinSpeed,
        spinDirection: sun.spinDirection,
      });
      await sunEntity.create();
      this.bodies.push(sunEntity);
      this.scene.add(sunEntity.entity);

      for (let planetIndex = 0; planetIndex < this.solarSystem.planets.length; planetIndex++) {
        const planet = this.solarSystem.planets[planetIndex];

        const orbitEntity = this.bodies.find((b) => b.id === planet.orbitEntityId) as Entity;
        const planetParams: EntityParams = {
          baseSeed: planet.seed,
          position: planet.position ? new Vector3(...planet.position) : orbitEntity.entity.position,
          terrainHeight: planet.terrainHeight,
          orbitEntity: orbitEntity,
          orbitRadius: planet.orbitRadius,
          orbitDirection: planet.orbitDirection,
          orbitSpeed: planet.orbitSpeed * maxPlanetOrbitSpeed,
          orbitInclanation: planet.orbitInclanation,
          orbitStartPosition: planet.orbitStartPosition,
          spinSpeed: planet.spinSpeed,
          spinDirection: planet.spinDirection,
          onShow: this.handleShowPlanet,
        };

        const planetEntity =
          planetIndex === 2
            ? new Earth(planet.id, planet.name, EntityType.Planet, planet.radius, planetParams)
            : new ClassM(planet.id, planet.name, EntityType.Planet, planet.radius, planetParams);
        await planetEntity.create();

        for (const moon of planet.moons) {
          const orbitEntity = planetEntity;
          const moonEntity = new Moon(moon.id, moon.name, EntityType.Moon, moon.radius, {
            baseSeed: moon.seed,
            position: moon.position ? new Vector3(...moon.position) : orbitEntity.entity.position,
            colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
            terrainHeight: moon.terrainHeight,
            orbitEntity: orbitEntity,
            orbitRadius: moon.orbitRadius,
            orbitDirection: moon.orbitDirection,
            orbitSpeed: moon.orbitSpeed * maxMoonOrbitSpeed,
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
