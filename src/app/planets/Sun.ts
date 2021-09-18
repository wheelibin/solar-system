import { Entity } from "./Entity";

export class Sun extends Entity {
  protected _dispose(): void {}
  protected getMapColour(height: number, y: number): number[] {
    const { r, g, b } = this.params.colour!;
    const rgba = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), 255];
    return [rgba[0], rgba[1], rgba[2], rgba[3]];
  }
}
