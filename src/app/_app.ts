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

let solarSystem: SolarSystem;

let initialised = false;
let scene: Scene;
let camera: Camera;
let clock = new Clock();
let bodies: Entity[] = [];
let renderer: WebGLRenderer;
let orbitControls: OrbitControls;
let stats: Stats;
let showPlanetId: number;
let cameraInitialPosition: [number, number, number];
let spaceTexture: Texture;
let gui: GUI;

let ambientLight: AmbientLight;
let pointLight: PointLight;

const options = {
  seed: 2,
};

const sunColour = 0xf7e096;

const dispose = () => {
  initialised = false;

  try {
    gui.destroy();
  } catch (error) {}

  spaceTexture.dispose();
  ambientLight.dispose();
  pointLight.dispose();

  for (const body of bodies) {
    body.dispose();
  }
  bodies = [];

  camera.remove();
  renderer.dispose();
  orbitControls.dispose();
  scene.clear();

  const canvasElements = document.getElementsByTagName("canvas");
  for (let i = 0; i < canvasElements.length; i++) {
    const canvas = canvasElements[i];
    canvas.remove();
  }
};

export const init = async () => {
  solarSystem = new SolarSystemGenerator().generate(options.seed);

  showPlanetId = -1;

  scene = new Scene();
  scene.background = new Color().setHex(0x000000);

  const loader = new CubeTextureLoader();
  spaceTexture = loader.load([
    "assets/kurt/space_ft.png",
    "assets/kurt/space_bk.png",
    "assets/kurt/space_up.png",
    "assets/kurt/space_dn.png",
    "assets/kurt/space_rt.png",
    "assets/kurt/space_lf.png",
  ]);
  scene.background = spaceTexture;

  // Renderer
  renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Camera
  camera = new Camera();
  camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 50, 1e7);
  cameraInitialPosition = [0, solarSystem.suns[0].radius * 6, solarSystem.suns[0].radius * 20];
  camera.position.set(...cameraInitialPosition);

  camera.lookAt(0, 0, 0);

  // Controls
  orbitControls = new OrbitControls(camera, renderer.domElement);

  // Stats
  stats = new (Stats as any)();
  document.body.appendChild(stats.dom);

  // Lighting
  ambientLight = new AmbientLight(0xffffff, 0.15);
  scene.add(ambientLight);

  pointLight = new PointLight(sunColour, 1);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // var axesHelper = new AxesHelper(5000);
  // scene.add(axesHelper);

  await createSolarSystem();

  // UI
  gui = new GUI();

  const buttonHandlers = {
    resetView: () => {
      showPlanetId = -1;
      camera.position.set(...cameraInitialPosition);
      orbitControls = new OrbitControls(camera, renderer.domElement);
    },
    toggleOrbits: () => {
      for (const body of bodies) {
        if (body.orbit) {
          body.orbit.opacity = body.orbit.opacity === 0 ? 0.5 : 0;
        }
      }
    },
    newSeed: () => {
      options.seed = MathUtils.randInt(10000, 100000);
      reset();
    },
  };

  gui.add(buttonHandlers, "newSeed").name("New Seed");
  gui.add(options, "seed").name("Seed").onFinishChange(reset);

  const viewActionsFolder = gui.addFolder("View Actions");
  viewActionsFolder.open();
  viewActionsFolder.add(buttonHandlers, "toggleOrbits").name("Toggle Orbits");
  viewActionsFolder.add(buttonHandlers, "resetView").name("Reset View");
  for (const planet of bodies.filter((b) => b.entityType === EntityType.Planet)) {
    const ssPlanet = solarSystem.planets.find((p) => p.id === planet.id);
    viewActionsFolder.add(planet, "show").name(ssPlanet?.name || "A Planet");
  }

  initialised = true;
};

const reset = () => {
  dispose();
  init().then(() => {
    animate();
  });
};

export const animate = () => {
  if (!initialised) {
    return;
  }
  requestAnimationFrame(animate);

  bodies.forEach((body) => {
    body.animate(clock);
  });

  orbitControls.update();
  stats.update();

  if (showPlanetId > -1) {
    const planet = bodies.find((b) => b.id === showPlanetId);
    if (planet) {
      const pos = new Vector3();
      planet.sphere.getWorldPosition(pos);

      camera.position.set(pos.x + planet.radius * 2, pos.y + planet.radius * 2, pos.z + planet.radius * 8);
      camera.lookAt(pos.x, pos.y, pos.z);
    }
  }

  renderer.render(scene, camera);
};

const createSolarSystem = async () => {
  const handleShowPlanet = (id: number) => {
    showPlanetId = id;
  };

  for (const sun of solarSystem.suns) {
    const sunEntity = new Sun(sun.id, EntityType.Sun, sun.radius, {
      baseSeed: sun.seed,
      position: sun.position ? new Vector3(...sun.position) : new Vector3(0, 0, 0),
      colour: new Color(0xffca20),
      terrainHeight: 0,
      texturePath: "assets/sun.jpg",
      orbitEntity: false,
      orbitRadius: sun.orbitRadius,
      orbitDirection: sun.orbitDirection,
      orbitSpeed: sun.orbitSpeed,
      spinSpeed: sun.spinSpeed,
    });
    await sunEntity.create();
    bodies.push(sunEntity);
    scene.add(sunEntity.entity);

    for (let planetIndex = 0; planetIndex < solarSystem.planets.length; planetIndex++) {
      const planet = solarSystem.planets[planetIndex];

      const orbitEntity = bodies.find((b) => b.id === planet.orbitEntityId) as Entity;
      const planetParams: EntityParams = {
        baseSeed: planet.seed,
        position: planet.position ? new Vector3(...planet.position) : orbitEntity.entity.position,
        terrainHeight: planet.terrainHeight,
        orbitEntity: orbitEntity,
        orbitRadius: planet.orbitRadius,
        orbitDirection: planet.orbitDirection,
        orbitSpeed: planet.orbitSpeed,
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
          spinSpeed: moon.spinSpeed,
        });
        await moonEntity.create();
        bodies.push(moonEntity);
        // add the moon to the planet (so it follows the planet's orbit)
        planetEntity.entity.add(moonEntity.entity);
      }

      bodies.push(planetEntity);
      scene.add(planetEntity.entity);
    }
  }
};
