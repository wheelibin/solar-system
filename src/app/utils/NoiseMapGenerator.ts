import SimplexNoise from "simplex-noise";
import { MathUtils } from "three";

export class NoiseMapGenerator {
  private noiseGenerator: SimplexNoise;

  constructor(seed?: number) {
    this.noiseGenerator = new SimplexNoise(seed);
  }

  public generateNoiseMap(width: number, height: number): number[][] {
    const map: number[][] = [];

    for (let x = 0; x < width; x++) {
      map[x] = [];
      for (let y = 0; y < height; y++) {
        // add noise at various frequencies
        let noise = this.getMixedFrequencyNoise(
          x,
          y,
          [0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.64, 1.28]
        );
        noise = Math.pow(noise, 2.3);

        map[x][y] = noise;
      }
    }

    this.makeSeamlessVertically(map, height * 0.2);
    this.makeSeamlessHorizontally(map, width * 0.05);

    return map;
  }

  private getNoise(
    x: number,
    y: number,
    frequency: number,
    xOffset: number = 0,
    yOffset: number = 0
  ) {
    const _x = frequency * x + xOffset;
    const _y = frequency * y + yOffset;
    const amplitude = 1 / frequency;

    // get noise in the range 0-1
    const n = this.noiseGenerator.noise2D(_x, _y) / 2 + 0.5;

    let noise = amplitude * n;
    return noise;
  }

  private getMixedFrequencyNoise(x: number, y: number, frequencies: number[]) {
    let sumOfAmplitudes = 0;
    const noise = frequencies.reduce(
      (previous: number, frequency: number, index: number) => {
        sumOfAmplitudes += 1 / frequency;

        // add offsets so different frequencies (octaves)
        // sample from a different part of the noise space
        const xOffset = index * 10;
        const yOffset = index * 100;
        return previous + this.getNoise(x, y, frequency, xOffset, yOffset);
      },
      0
    );
    return noise / sumOfAmplitudes;
  }

  // ported from here:
  // https://medium.com/nerd-for-tech/making-a-seamless-perlin-noise-in-c-4cfc12a90f93
  private makeSeamlessHorizontally(noiseMap: number[][], stitchWidth: number) {
    const width = noiseMap.length;
    const height = noiseMap[0].length;

    // iterate on the stitch band (on the left
    // of the noise)
    for (let x = 0; x < stitchWidth; x++) {
      // get the transparency value from
      // a linear gradient
      const v = x / stitchWidth;

      for (let y = 0; y < height; y++) {
        // compute the "mirrored x position":
        // the far left is copied on the right
        // and the far right on the left
        const o = ~~(width - stitchWidth + x);
        // copy the value on the right of the noise
        noiseMap[o][y] = MathUtils.lerp(
          noiseMap[o][y],
          noiseMap[~~(stitchWidth - x)][y],
          v
        );
      }
    }
  }

  // ported from here:
  // https://medium.com/nerd-for-tech/making-a-seamless-perlin-noise-in-c-4cfc12a90f93
  private makeSeamlessVertically(noiseMap: number[][], stitchHeight: number) {
    const width = noiseMap.length;
    const height = noiseMap[0].length;

    // iterate through the stitch band (both
    // top and bottom sides are treated
    // simultaneously because its mirrored)
    for (let y = 0; y < stitchHeight; y++) {
      // number of neighbour pixels to
      // consider for the average (= kernel size)
      const k = Math.ceil(stitchHeight - y);
      // go through the entire row
      for (let x = 0; x < width; x++) {
        // compute the sum of pixel values
        // in the top and the bottom bands
        let s1 = 0.0;
        let s2 = 0.0;
        let c = 0;
        for (let o = x - k; o < x + k; o++) {
          if (o < 0 || o >= width) {
            continue;
          }

          s1 += noiseMap[o][y];
          s2 += noiseMap[o][height - y - 1];
          c++;
        }
        // compute the means and assign them to
        // the pixels in the top and the bottom
        // rows
        noiseMap[x][y] = s1 / c;
        noiseMap[x][height - y - 1] = s2 / c;
      }
    }
  }
}
