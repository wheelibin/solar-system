import { Entity } from "./Entity";

const colours = {
  oceanDark: [0, 24, 168, 255],
  oceanLight: [0, 105, 148, 255],
  beachDark: [140, 129, 95, 255],
  beachLight: [221, 202, 146, 255],
  forestDark: [0, 66, 37, 255],
  forestLight: [0, 127, 72, 255],
  jungleDark: [48, 102, 79, 255],
  jungleLight: [57, 122, 94, 255],
  savannahDark: [136, 155, 105, 255],
  savannahLight: [165, 189, 126, 255],
  desertDark: [175, 175, 144, 255],
  desertLight: [198, 198, 167, 255],
  snowDark: [200, 200, 200, 255],
  snowLight: [255, 255, 255, 255],
};

export class Earth extends Entity {
  protected maxTerrainHeight = 8;

  protected _dispose(): void {}

  protected getMapColour(height: number, y: number) {
    const colour = this.getColourForHeight(height);

    // if (y > this.textureHeight * 0.9) {
    //   return this.lerpColour(colour, colours.snow, y / this.textureHeight);
    // }

    return colour;
  }

  private getColourForHeight(height: number) {
    const levels = [
      // sea
      {
        min: 0,
        max: 60,
        dark: colours.oceanDark,
        light: colours.oceanLight,
      },
      // beach
      {
        min: 60,
        max: 70,
        dark: colours.oceanLight,
        light: colours.beachLight,
      },
      // forest
      {
        min: 70,
        max: 110,
        dark: colours.forestDark,
        light: colours.forestLight,
      },
      // jungle
      {
        min: 110,
        max: 120,
        dark: colours.jungleDark,
        light: colours.jungleLight,
      },
      // savannah
      {
        min: 120,
        max: 140,
        dark: colours.savannahDark,
        light: colours.savannahLight,
      },
      // desert
      {
        min: 120,
        max: 150,
        dark: colours.desertDark,
        light: colours.desertLight,
      },
    ];

    for (const level of levels) {
      if (height < level.max) {
        return this.getRangeColour(level, height);
      }
    }

    return colours.snowLight;
  }
}
