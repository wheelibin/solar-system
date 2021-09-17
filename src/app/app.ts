import {
  AmbientLight,
  Camera,
  Clock,
  Color,
  CubeTextureLoader,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { Entity } from "./planets/Entity";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { addPointLight } from "./lighting";
import { Moon } from "./planets/Moon";
// import { Earth } from "./planets/Earth";
import { ClassM } from "./planets/ClassM";

import { Sun } from "./planets/Sun";
import { SolarSystem, SolarSystemGenerator } from "./SolarSystemGenerator";

let solarSystem: SolarSystem;

let scene: Scene;
let camera: Camera;
let clock = new Clock();
let bodies: Entity[] = [];
let renderer: WebGLRenderer;
let orbitControls: OrbitControls;
// let flyControls: FlyControls;
let stats: Stats;

const SEED = 2;
const sunColour = 0xf7e096;

export const init = async () => {
  solarSystem = new SolarSystemGenerator().generate(SEED);

  scene = new Scene();
  scene.background = new Color().setHex(0x000000);

  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "assets/kurt/space_ft.png",
    "assets/kurt/space_bk.png",
    "assets/kurt/space_up.png",
    "assets/kurt/space_dn.png",
    "assets/kurt/space_rt.png",
    "assets/kurt/space_lf.png",
  ]);
  scene.background = texture;

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
  // camera.position.set(solarSystem.suns[0].radius, solarSystem.suns[0].radius, solarSystem.suns[0].radius * 8);
  camera.position.set(0, -(solarSystem.suns[0].radius * 60), solarSystem.suns[0].radius * 40);

  camera.lookAt(0, 0, 0);

  // Controls
  orbitControls = new OrbitControls(camera, renderer.domElement);

  // Stats
  stats = new (Stats as any)();
  document.body.appendChild(stats.dom);

  // Lighting
  // scene.add(new AmbientLight(0xffffff, 0.15));
  scene.add(new AmbientLight(0xffffff, 1));

  addPointLight(scene, {
    colour: sunColour,
    intensity: 1,
    position: new Vector3(0, 0, 0),
    showHelper: true,
  });

  await createSolarSystem();
};

export const animate = () => {
  requestAnimationFrame(animate);

  bodies.forEach((body) => {
    body.animate(clock);
  });

  orbitControls.update();
  // flyControls.update(clock.getDelta());
  stats.update();

  // const planet1 = bodies.find((b) => b.id === 2);
  // if (planet1) {
  // const pos = new Vector3();
  // planet1.sphere.getWorldPosition(pos);
  // orbitControls.target.set(pos.x, pos.y, pos.z);
  // const camPos = pos.multiplyScalar(1.5);
  // camera.position.set(camPos.x, camPos.y, camPos.z);
  // camera.lookAt(pos.x, pos.y, pos.z );
  // }

  renderer.render(scene, camera);
};

const createSolarSystem = async () => {
  for (const sun of solarSystem.suns) {
    const sunEntity = new Sun(sun.id, sun.radius, {
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

    for (const planet of solarSystem.planets) {
      const orbitEntity = bodies.find((b) => b.id === planet.orbitEntityId) as Entity;
      const planetEntity = new ClassM(planet.id, planet.radius, {
        baseSeed: planet.seed,
        position: planet.position ? new Vector3(...planet.position) : orbitEntity.entity.position,
        terrainHeight: planet.terrainHeight,
        orbitEntity: orbitEntity,
        orbitRadius: planet.orbitRadius,
        orbitDirection: planet.orbitDirection,
        orbitSpeed: planet.orbitSpeed,
        spinSpeed: planet.spinSpeed,
      });
      await planetEntity.create();

      for (const moon of planet.moons) {
        const orbitEntity = planetEntity;
        const moonEntity = new Moon(moon.id, moon.radius, {
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
