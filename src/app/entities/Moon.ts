import { Entity } from "./Entity";

export class Moon extends Entity {
  protected maxTerrainHeight = 5;

  protected _dispose(): void {}

  protected getMapColour(height: number, y: number): number[] {
    const ratio = height / 128;

    const { r, g, b } = this.params.colour!;

    const rgba = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), 255];

    return [rgba[0] * ratio, rgba[1] * ratio, rgba[2] * ratio, rgba[3]];
  }
}
