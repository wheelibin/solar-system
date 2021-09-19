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
  Texture,
  MathUtils,
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
  orbitEntity: Entity | false;
  orbitDirection: number;
  orbitSpeed: number;
  orbitRadius: number;
  orbitInclanation: number;
  orbitStartPosition: number;
  spinSpeed: number;
  spinDirection: number;

  terrainHeight?: number;
  colour?: Color;
  castShadow?: boolean;
  receiveShadow?: boolean;
  texturePath?: string;
  onShow?: (id: number) => void;
};

export abstract class Entity {
  public id: number;
  public name: string;
  public entityType: EntityType;
  public entity: Group;
  public params: EntityParams;
  public radius: number;
  public sphere!: Mesh;
  public orbit!: Material;

  protected textureWidth: number;
  protected textureHeight: number;
  protected abstract maxTerrainHeight: number;

  private loader = new TextureLoader();
  private sphereGeometry!: SphereBufferGeometry;
  private orbitGeometry!: BufferGeometry;
  private material!: Material;
  private heightMapTexture!: CanvasTexture;
  private colourMapTexture!: CanvasTexture;
  private texture!: Texture;

  constructor(id: number, name: string, entityType: EntityType, radius: number, params: EntityParams) {
    this.id = id;
    this.name = name;
    this.entityType = entityType;
    this.radius = radius;
    this.params = params;

    this.entity = new Group();

    this.textureWidth = 512;
    this.textureHeight = 256;
  }

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

    this.sphereGeometry = new SphereBufferGeometry(this.radius, 64, 48);
    this.sphere = new Mesh(this.sphereGeometry, this.material);

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

      // set orbit inclanation/tilt
      this.entity.rotation.x = MathUtils.degToRad(this.params.orbitInclanation);

      // set initial orbit position
      this.entity.rotation.y = MathUtils.degToRad(360 * this.params.orbitStartPosition);
    }

    this.entity.add(this.sphere);

    return this;
  }

  public animate(clock: Clock, speed: number) {
    clock.getElapsedTime();

    if (this.params.orbitEntity) {
      const orbitSpeed = this.params.orbitSpeed * speed;
      const orbitDirection = this.params.orbitDirection;
      this.entity.rotation.y += orbitSpeed * orbitDirection;
    }

    if (this.params.spinSpeed) {
      this.sphere.rotation.y += this.params.spinSpeed * speed * this.params.spinDirection;
    }
  }

  public show() {
    if (this.params.onShow) {
      this.params.onShow(this.id);
    }
  }

  protected abstract _dispose(): void;
  public dispose() {
    // geometries
    this.sphereGeometry?.dispose();
    this.orbitGeometry?.dispose();

    // materials
    this.orbit?.dispose();
    this.material?.dispose();

    // textures
    this.heightMapTexture?.dispose();
    this.colourMapTexture?.dispose();
    this.texture?.dispose();

    // call implemented dispose method
    this._dispose();
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
    this.orbitGeometry = new BufferGeometry();
    const verts = [];
    this.orbit = new LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });

    for (var i = 0; i <= segmentCount; i++) {
      var theta = (i / segmentCount) * Math.PI * 2;
      verts.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
    }
    const vertices = new Float32Array(verts);
    this.orbitGeometry.setAttribute("position", new BufferAttribute(vertices, 3));
    return new Line(this.orbitGeometry, this.orbit);
  }
}
