import { Entity, EntityParams, EntityType } from "./Entity";

export class Sun extends Entity {
  protected maxTerrainHeight = 0;

  constructor(id: number, entityType: EntityType, radius: number, params: EntityParams) {
    super(id, entityType, radius, params);

    this.params.terrainHeight = 0;
    this.params.texturePath = "assets/sun.jpg";
  }

  protected _dispose(): void {}

  protected getMapColour(height: number, y: number): number[] {
    const { r, g, b } = this.params.colour!;
    const rgba = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), 255];
    return [rgba[0], rgba[1], rgba[2], rgba[3]];
  }
}
