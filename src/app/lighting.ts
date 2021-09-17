import {
  CameraHelper,
  ColorRepresentation,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  Light,
  Object3D,
  PointLight,
  PointLightHelper,
  Vector3,
} from "three";

export type LightParams = {
  colour: ColorRepresentation;
  intensity: number;
  position: Vector3;
  showHelper?: boolean;
  castShadow?: boolean;
};

export const addHemisphereLight = (scene: Object3D, params: LightParams) => {
  const light = addLight(new HemisphereLight(), scene, params);
  const { showHelper } = params;

  if (showHelper) {
    const helper = new HemisphereLightHelper(light as HemisphereLight, 10);
    scene.add(helper);
  }
};

export const addDirectionalLight = (scene: Object3D, params: LightParams) => {
  const light = addLight(new DirectionalLight(), scene, params);

  const { showHelper } = params;

  if (showHelper) {
    const helper = new DirectionalLightHelper(light as DirectionalLight, 10);
    scene.add(helper);
    const cameraHelper = new CameraHelper(light.shadow.camera);
    scene.add(cameraHelper);
  }
};

export const addPointLight = (scene: Object3D, params: LightParams) => {
  const light = addLight(new PointLight(), scene, params);
  const { showHelper } = params;

  if (showHelper) {
    const helper = new PointLightHelper(light as PointLight, 10);
    scene.add(helper);
  }
};

function addLight(light: Light, scene: Object3D, params: LightParams): Light {
  const { colour, intensity, position, castShadow } = params;

  light.color.set(colour);
  light.intensity = intensity;
  light.position.set(position.x, position.y, position.z);
  light.position.multiplyScalar(30);

  scene.add(light);

  light.castShadow = !!castShadow;
  return light;
}
