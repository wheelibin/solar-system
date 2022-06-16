import {
  CanvasTexture,
  EquirectangularReflectionMapping,
  MeshPhongMaterial,
  MeshBasicMaterial,
  SphereBufferGeometry,
  MathUtils,
  InstancedMesh,
  Matrix4,
  Euler,
  Quaternion,
  Vector3,
} from "three";
import { Random } from "../utils/Random";
import { seedIndexes } from "../utils/SolarSystemGenerator";
import { Entity } from "./Entity";

export class AsteroidBelt extends Entity {
  protected maxTerrainHeight = this.radius < 10 ? 48 : this.radius / 16;

  protected _dispose(): void {}

  public async create() {
    if (this.params.terrainHeight && this.params.terrainHeight > 0) {
      const terrainMaps = this.generateTerrainMaps();

      this.heightMapTexture = new CanvasTexture(terrainMaps.heightMap.canvas);
      this.colourMapTexture = new CanvasTexture(terrainMaps.map.canvas);

      this.heightMapTexture.mapping = EquirectangularReflectionMapping;
      this.colourMapTexture.mapping = EquirectangularReflectionMapping;

      const terrainHeight = Math.ceil(this.params.terrainHeight * this.maxTerrainHeight);

      this.material = new MeshPhongMaterial({
        bumpMap: this.heightMapTexture,
        bumpScale: terrainHeight,
        map: this.colourMapTexture,
        displacementMap: this.heightMapTexture,
        displacementScale: terrainHeight,
      });
    } else {
      if (this.params.texturePath) {
        this.texture = await this.loader.loadAsync(this.params.texturePath);
        this.material = new MeshBasicMaterial({ map: this.texture, color: this.params.colour });
      } else {
        this.material = new MeshBasicMaterial({
          color: this.params.colour,
        });
      }
    }

    const radius = Random.getRandomFloat(this.radius, Number(this.params.maxRadius), [
      ...this.params.seed,
      seedIndexes.radius,
    ]);
    const minScale = this.radius / radius;
    const maxScale = Number(this.params.maxRadius) / radius;

    this.sphereGeometry = new SphereBufferGeometry(radius, 64, 48);

    const count = Number(this.params.itemCount);

    this.sphere = new InstancedMesh(this.sphereGeometry, this.material, count);
    const mesh = this.sphere as InstancedMesh;

    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3();
    const matrix = new Matrix4();

    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * Math.PI * 2;

      const mod = Random.getRandom([...this.params.seed, seedIndexes.radius, i]);
      const cos = Math.cos(theta) * this.params.orbitRadius;
      const sin = Math.sin(theta) * this.params.orbitRadius;
      const randomDirection = Random.coinToss([...this.params.seed, seedIndexes.orbitDirection, i]) ? 1 : -1;
      position.x = cos + cos * (mod % 0.2);
      position.y = this.radius * this.radius * (mod % 0.5) * randomDirection;
      position.z = sin + sin * (mod % 0.2);

      rotation.x = Random.getRandom([...this.params.seed, seedIndexes.rotation, i, 1]) * 2 * Math.PI;
      rotation.y = Random.getRandom([...this.params.seed, seedIndexes.rotation, i, 2]) * 2 * Math.PI;
      rotation.z = Random.getRandom([...this.params.seed, seedIndexes.rotation, i, 3]) * 2 * Math.PI;

      quaternion.setFromEuler(rotation);

      const scaleAmount = 0.5 * Random.getRandomFloat(minScale, maxScale, [...this.params.seed, seedIndexes.scale, i]);
      scale.set(scaleAmount, scaleAmount, scaleAmount);

      matrix.compose(position, quaternion, scale);

      mesh.setMatrixAt(i, matrix);
    }

    this.sphere.castShadow = !!this.params.castShadow;
    this.sphere.receiveShadow = !!this.params.receiveShadow;

    if (this.params.hasLabel) {
      this.addLabel();
    }

    // mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.entity.add(mesh);

    if (this.params.orbitEntity) {
      const orbitEntityPos = this.params.orbitEntity.sphere.position;
      // position the whole entity at the orbit entity position
      this.entity.position.set(orbitEntityPos.x, orbitEntityPos.y, orbitEntityPos.z);

      // set orbit inclanation/tilt
      this.entity.rotation.x = MathUtils.degToRad(this.params.orbitInclanation);

      // set initial orbit position
      this.entity.rotation.y = MathUtils.degToRad(360 * this.params.orbitStartPosition);
    }

    this.params.orbitSpeed *= 0.1;

    return this;
  }

  protected getMapColour(height: number, y: number): number[] {
    const ratio = height / 128;

    const { r, g, b } = this.params.colour!;

    const rgba = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), 255];

    return [rgba[0] * ratio, rgba[1] * ratio, rgba[2] * ratio, rgba[3]];
  }
}
