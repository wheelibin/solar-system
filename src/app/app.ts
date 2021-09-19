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

export class App {
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

  private ambientLight!: AmbientLight;
  private pointLight!: PointLight;

  private options = {
    seed: 2,
    simulationSpeed: 5,
  };

  private buttonHandlers = {
    resetView: () => {
      this.showPlanetId = -1;
      this.camera.position.set(...this.cameraInitialPosition);
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    toggleOrbits: () => {
      for (const body of this.bodies) {
        if (body.orbit) {
          body.orbit.opacity = body.orbit.opacity === 0 ? 0.5 : 0;
        }
      }
    },
    newSeed: () => {
      this.options.seed = MathUtils.randInt(10000, 100000);
      this.reset();
    },
    changeSeed: () => {
      this.reset();
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

    // Stats
    this.stats = new (Stats as any)();
    document.body.appendChild(this.stats.dom);

    // UI
    this.gui = new GUI();

    this.gui.add(this.buttonHandlers, "newSeed").name("New Seed");
    this.gui.add(this.options, "seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed);

    this.gui.add(this.options, "simulationSpeed", 1, 10, 0.5).name("Simulation Speed");
  }

  public init = async () => {
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

    this.guiViewActionsFolder = this.gui.addFolder("View Actions");
    this.guiViewActionsFolder.open();
    this.guiViewActionsFolder.add(this.buttonHandlers, "toggleOrbits").name("Toggle Orbits");
    this.guiViewActionsFolder.add(this.buttonHandlers, "resetView").name("Reset View");
    for (const planet of this.bodies.filter((b) => b.entityType === EntityType.Planet)) {
      const ssPlanet = this.solarSystem.planets.find((p) => p.id === planet.id);
      this.guiViewActionsFolder.add(planet, "show").name(ssPlanet?.name || "A Planet");
    }

    this.isRunning = true;
  };

  public animate = () => {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(this.animate);

    this.bodies.forEach((body) => {
      body.animate(this.clock);
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
    }

    this.renderer.render(this.scene, this.camera);
  };

  private clearScene = () => {
    this.isRunning = false;

    try {
      // this.gui.destroy();
      this.gui.removeFolder(this.guiViewActionsFolder);
      this.guiViewActionsFolder.destroy();
    } catch (error) {}

    // this.spaceTexture.dispose();
    this.ambientLight.dispose();
    this.pointLight.dispose();

    for (const body of this.bodies) {
      body.dispose();
    }
    this.bodies = [];
    this.scene.clear();

    this.renderer.render(this.scene, this.camera);

    // this.camera.remove();
    // this.renderer.dispose();
    // this.orbitControls.dispose();

    // const canvasElements = document.getElementsByTagName("canvas");
    // for (let i = 0; i < canvasElements.length; i++) {
    //   const canvas = canvasElements[i];
    //   canvas.remove();
    // }

    // this.init();
  };

  private reset = () => {
    this.gui.updateDisplay();
    this.clearScene();
    this.solarSystem = new SolarSystemGenerator().generate(this.options.seed);

    this.init().then(() => {
      this.animate();
    });
  };

  createSolarSystem = async () => {
    const handleShowPlanet = (id: number) => {
      this.showPlanetId = id;
    };

    for (const sun of this.solarSystem.suns) {
      const sunEntity = new Sun(sun.id, EntityType.Sun, sun.radius, {
        baseSeed: sun.seed,
        position: sun.position ? new Vector3(...sun.position) : new Vector3(0, 0, 0),
        colour: new Color(0xffca20),
        orbitEntity: false,
        orbitRadius: sun.orbitRadius,
        orbitDirection: sun.orbitDirection,
        orbitSpeed: sun.orbitSpeed,
        orbitInclanation: sun.orbitInclanation,
        spinSpeed: sun.spinSpeed,
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
          orbitSpeed: planet.orbitSpeed,
          orbitInclanation: planet.orbitInclanation,
          spinSpeed: planet.spinSpeed,
          onShow: handleShowPlanet,
        };

        const planetEntity =
          planetIndex === 2
            ? new Earth(planet.id, EntityType.Planet, planet.radius, planetParams)
            : new ClassM(planet.id, EntityType.Planet, planet.radius, planetParams);
        await planetEntity.create();

        for (const moon of planet.moons) {
          const orbitEntity = planetEntity;
          const moonEntity = new Moon(moon.id, EntityType.Moon, moon.radius, {
            baseSeed: moon.seed,
            position: moon.position ? new Vector3(...moon.position) : orbitEntity.entity.position,
            colour: moon.rgb ? new Color(...moon.rgb) : new Color(1, 1, 1),
            terrainHeight: moon.terrainHeight,
            orbitEntity: orbitEntity,
            orbitRadius: moon.orbitRadius,
            orbitDirection: moon.orbitDirection,
            orbitSpeed: moon.orbitSpeed,
            orbitInclanation: moon.orbitInclanation,
            spinSpeed: moon.spinSpeed,
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
