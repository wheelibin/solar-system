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
  SpriteMaterial,
  Sprite,
  Camera,
} from "three";
import { EntityParams } from "../models/EntityParams";

import { NoiseMapGenerator } from "../utils/NoiseMapGenerator";

type TerrainMaps = {
  heightMap: CanvasRenderingContext2D;
  map: CanvasRenderingContext2D;
};

export abstract class Entity {
  public entity: Group;
  public params: EntityParams;
  public radius: number;
  public sphere!: Mesh;
  public orbit!: Material;

  protected textureWidth: number;
  protected textureHeight: number;
  protected abstract maxTerrainHeight: number;
  protected material!: Material;
  protected heightMapTexture!: CanvasTexture;
  protected colourMapTexture!: CanvasTexture;

  protected loader = new TextureLoader();
  protected sphereGeometry!: SphereBufferGeometry;
  protected orbitGeometry!: BufferGeometry;
  protected texture!: Texture;

  protected labelContext!: CanvasRenderingContext2D;
  protected labelTexture!: Texture;
  protected labelSprite!: Sprite;
  protected labelScaleVector = new Vector3();
  protected labelAspectRatio!: number;

  constructor(radius: number, params: EntityParams) {
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
        shininess: 0,
        specular: 0x000000,
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

    if (this.params.hasLabel) {
      this.addLabel();
    }

    this.entity.add(this.sphere);

    if (this.params.orbitEntity) {
      const orbitEntityPos = this.params.orbitEntity.sphere.position;
      const orbitRadius = this.params.orbitRadius;

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

    return this;
  }

  public animate(clock: Clock, speed: number, camera: Camera, showLabels: boolean) {
    clock.getElapsedTime();

    if (this.params.orbitEntity) {
      // (/60=mins /60=seconds /60=account for framerate)
      const perSecond = this.params.orbitSpeed / 60 / 60 / 60;

      const orbitSpeed = perSecond * speed;
      const orbitDirection = this.params.orbitDirection;

      // as our planet/moon is positioned at the edge of our orbit circle
      // "orbiting" is simply a matter of rotating the whole entity :)
      this.entity.rotation.y += orbitSpeed * orbitDirection;
    }

    if (this.params.spinSpeed) {
      const perSecond = this.params.spinSpeed / 60 / 60 / 60;
      this.sphere.rotation.y += perSecond * speed * this.params.spinDirection;
    }

    if (this.params.hasLabel) {
      this.labelSprite.visible = showLabels;
      if (showLabels) {
        // keep the label the same size regardless of camera zoom
        const scaleFactor = 24;
        const scale = this.labelScaleVector.subVectors(this.sphere.position, camera.position).length() / scaleFactor;
        this.labelSprite.scale.set(scale, scale * this.labelAspectRatio, 1);
        this.labelSprite.position.y = this.radius;
      }
    }
  }

  public show() {
    if (this.params.onShow) {
      this.params.onShow(this.params.id);
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
    this.labelTexture?.dispose();

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

    const seed = [...this.params.seed, 99999].reduce((acc, cur) => (acc += cur));
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
    this.orbit = new LineBasicMaterial({ color: 0x666666, opacity: 1, transparent: false });

    for (var i = 0; i <= segmentCount; i++) {
      var theta = (i / segmentCount) * Math.PI * 2;
      verts.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
    }
    const vertices = new Float32Array(verts);
    this.orbitGeometry.setAttribute("position", new BufferAttribute(vertices, 3));
    return new Line(this.orbitGeometry, this.orbit);
  }

  protected addLabel() {
    this.labelContext = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;

    const fontSize = 44;
    this.labelContext.canvas.width = 384;
    this.labelContext.canvas.height = 384;

    this.labelContext.font = `${fontSize}pt 'Lucida Grande', sans-serif`;

    this.labelAspectRatio = this.labelContext.canvas.height / this.labelContext.canvas.width;

    this.labelContext.fillStyle = "white";
    this.labelContext.textAlign = "center";
    this.labelContext.fillText(this.params.name, this.labelContext.canvas.width / 2, fontSize + 1);

    this.labelTexture = new Texture(this.labelContext.canvas);
    this.labelTexture.needsUpdate = true;
    const spriteMaterial = new SpriteMaterial({
      map: this.labelTexture,
      transparent: true,
    });
    this.labelSprite = new Sprite(spriteMaterial);

    this.sphere.add(this.labelSprite);
  }
}
