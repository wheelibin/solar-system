import {
  CanvasTexture,
  Clock,
  Color,
  EquirectangularReflectionMapping,
  Group,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  SphereBufferGeometry,
  TextureLoader,
  Vector3,
  BufferGeometry,
  BufferAttribute,
} from "three";

import { NoiseMapGenerator } from "../NoiseMapGenerator";

export enum EntityType {
  Sun,
  Planet,
  Moon,
}

type TerrainMaps = {
  heightMap: CanvasRenderingContext2D;
  map: CanvasRenderingContext2D;
};

export type EntityParams = {
  baseSeed: number[];
  position: Vector3;
  terrainHeight: number;
  orbitEntity: Entity | false;
  orbitDirection: number;
  orbitSpeed: number;
  orbitRadius: number;
  spinSpeed: number;

  colour?: Color;
  castShadow?: boolean;
  receiveShadow?: boolean;
  texturePath?: string;
  onShow?: (id: number) => void;
};

export abstract class Entity {
  public id: number;
  public entityType: EntityType;
  public entity: Group;
  public params: EntityParams;
  public radius: number;
  public sphere!: Mesh;
  public orbit!: Material;

  private loader = new TextureLoader();

  protected textureWidth: number;
  protected textureHeight: number;

  constructor(id: number, entityType: EntityType, radius: number, params: EntityParams) {
    this.id = id;
    this.entityType = entityType;
    this.radius = radius;
    this.params = params;

    this.entity = new Group();

    this.textureWidth = 512;
    this.textureHeight = 256;
  }

  public async create() {
    let material: Material;
    if (this.params.terrainHeight > 0) {
      const terrainMaps = this.generateTerrainMaps();

      const heightMapTexture = new CanvasTexture(terrainMaps.heightMap.canvas);
      const colourMapTexture = new CanvasTexture(terrainMaps.map.canvas);

      heightMapTexture.mapping = EquirectangularReflectionMapping;
      colourMapTexture.mapping = EquirectangularReflectionMapping;

      material = new MeshPhongMaterial({
        bumpMap: heightMapTexture,
        bumpScale: this.params.terrainHeight,
        map: colourMapTexture,
        displacementMap: heightMapTexture,
        displacementScale: this.params.terrainHeight,
      });
    } else {
      if (this.params.texturePath) {
        const texture = await this.loader.loadAsync(this.params.texturePath);
        material = new MeshBasicMaterial({ map: texture, color: this.params.colour });
      } else {
        material = new MeshBasicMaterial({
          color: this.params.colour,
        });
      }
    }

    const geometry = new SphereBufferGeometry(this.radius, 64, 48);
    this.sphere = new Mesh(geometry, material);

    this.sphere.castShadow = !!this.params.castShadow;
    this.sphere.receiveShadow = !!this.params.receiveShadow;

    // const geom = new PlaneGeometry(this.textureWidth, this.textureHeight);
    // this.sphere = new Mesh(geom, material);

    if (this.params.orbitEntity) {
      const orbitEntityPos = this.params.orbitEntity.sphere.position;
      const orbitRadius = this.params.orbitRadius || 400;

      // create an orbit cirlce and add it to the entity
      const orbit = this.createOrbitCircle(orbitRadius);
      this.entity.add(orbit);

      // position the sphere at the edge of the orbit circle
      this.sphere.position.set(orbitRadius, 0, 0);

      // position the whole entity at the orbit entity position
      this.entity.position.set(orbitEntityPos.x, orbitEntityPos.y, orbitEntityPos.z);
    }

    this.entity.add(this.sphere);

    return this;
  }

  public animate(clock: Clock) {
    clock.getElapsedTime();

    if (this.params.orbitEntity) {
      const orbitSpeed = this.params.orbitSpeed;
      const orbitDirection = this.params.orbitDirection;
      this.entity.rotation.y += orbitSpeed * orbitDirection;
    }

    if (this.params.spinSpeed) {
      this.sphere.rotation.y += this.params.spinSpeed;
    }
  }

  public show() {
    if (this.params.onShow) {
      this.params.onShow(this.id);
    }
  }

  protected generateTerrainMaps(): TerrainMaps {
    const recordSize = 4;

    const heightMapContext = this.getCanvasContext();
    const heightMapImageData = heightMapContext.createImageData(this.textureWidth, this.textureHeight);
    const heightMapData = heightMapImageData.data;

    const colourMapContext = this.getCanvasContext();
    const colourMapImageData = colourMapContext.createImageData(this.textureWidth, this.textureHeight);
    const colourMapData = colourMapImageData.data;

    const seed = [...this.params.baseSeed, 99999].reduce((acc, cur) => (acc += cur));
    const ng = new NoiseMapGenerator(seed);
    const noiseMap = ng.generateNoiseMap(this.textureWidth, this.textureHeight);

    for (let i = 0; i < heightMapData.length; i += recordSize) {
      const x = (i / recordSize) % this.textureWidth;
      const y = ~~(i / recordSize / this.textureWidth);

      const noise = noiseMap[x][y];
      const generatedColourValue = 255 * noise;

      let colourValue = generatedColourValue;

      // RGBA
      const heightColour = [colourValue, colourValue, colourValue, 255];
      for (let ci = 0; ci < heightColour.length; ci++) {
        heightMapData[i + ci] = heightColour[ci];
      }

      let mapColour = this.getMapColour(colourValue, y);

      for (let ci = 0; ci < mapColour.length; ci++) {
        colourMapData[i + ci] = mapColour[ci];
      }
    }

    heightMapContext.putImageData(heightMapImageData, 0, 0);
    colourMapContext.putImageData(colourMapImageData, 0, 0);

    return {
      heightMap: heightMapContext,
      map: colourMapContext,
    };
  }

  protected abstract getMapColour(height: number, y: number): number[];

  protected getRangeColour(level: { min: number; max: number; dark: number[]; light: number[] }, height: number) {
    return this.lerpColour(level.dark, level.light, (height - level.min) / (level.max - level.min));
  }

  protected lerpColour(col1: number[], col2: number[], ratio: number) {
    const c = this.convertToColor(col1).lerp(this.convertToColor(col2), ratio);
    return [...c.toArray(), 255];
  }

  protected convertToColor(colour: number[]) {
    return new Color().setRGB(colour[0], colour[1], colour[2]);
  }

  protected getCanvasContext() {
    const ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = this.textureWidth;
    ctx.canvas.height = this.textureHeight;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return ctx;
  }

  private createOrbitCircle(radius: number) {
    var segmentCount = 128;
    const geometry = new BufferGeometry();
    const verts = [];
    this.orbit = new LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });

    for (var i = 0; i <= segmentCount; i++) {
      var theta = (i / segmentCount) * Math.PI * 2;
      verts.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
    }
    const vertices = new Float32Array(verts);
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    return new Line(geometry, this.orbit);
  }
}
