import { Random } from "../Random";
import { Entity } from "./Entity";

export class ClassM extends Entity {
  protected maxTerrainHeight = this.radius / 16;

  protected _dispose(): void {}

  private colours = {
    oceanDark: this.getRandomColour(0),
    oceanLight: this.getRandomColour(1),
    beachDark: this.getRandomColour(2),
    beachLight: this.getRandomColour(3),
    forestDark: this.getRandomColour(4),
    forestLight: this.getRandomColour(5),
    jungleDark: this.getRandomColour(6),
    jungleLight: this.getRandomColour(7),
    savannahDark: this.getRandomColour(8),
    savannahLight: this.getRandomColour(9),
    desertDark: this.getRandomColour(10),
    desertLight: this.getRandomColour(11),
    snowDark: this.getRandomColour(12),
    snowLight: this.getRandomColour(13),
  };

  protected getMapColour(height: number, y: number) {
    const colour = this.getColourForHeight(height);
    return colour;
  }

  private getColourForHeight(height: number) {
    const levels = [
      // sea
      {
        min: 0,
        max: 60,
        dark: this.colours.oceanDark,
        light: this.colours.oceanLight,
      },
      // beach
      {
        min: 60,
        max: 70,
        dark: this.colours.oceanLight,
        light: this.colours.beachLight,
      },
      // forest
      {
        min: 70,
        max: 110,
        dark: this.colours.forestDark,
        light: this.colours.forestLight,
      },
      // jungle
      {
        min: 110,
        max: 120,
        dark: this.colours.jungleDark,
        light: this.colours.jungleLight,
      },
      // savannah
      {
        min: 120,
        max: 140,
        dark: this.colours.savannahDark,
        light: this.colours.savannahLight,
      },
      // desert
      {
        min: 120,
        max: 150,
        dark: this.colours.desertDark,
        light: this.colours.desertLight,
      },
    ];

    for (const level of levels) {
      if (height < level.max) {
        return this.getRangeColour(level, height);
      }
    }

    return this.colours.snowLight;
  }

  private getRandomColour(colIndex: number) {
    const seed = [...this.params.baseSeed, colIndex];

    const min = 0.2;
    return [
      255 * Random.getRandomFloat(min, 1, [...seed, 0]),
      255 * Random.getRandomFloat(min, 1, [...seed, 1]),
      255 * Random.getRandomFloat(min, 1, [...seed, 2]),
      255,
    ];
  }
}
