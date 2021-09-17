import mt19937 from "@stdlib/random-base-mt19937";

const MAX = 4294967295;

export class Random {
  public static getRandom(seed: number[]) {
    var rand = mt19937.factory({
      seed: seed,
    });

    return rand() / MAX;
  }

  public static getRandomInt(min: number, max: number, seed: number[]) {
    return Math.floor(Random.getRandom(seed) * (max - min + 1) + min);
  }

  public static getRandomFloat(min: number, max: number, seed: number[]) {
    return Random.getRandom(seed) * (max - min) + min;
  }

  public static coinToss(seed: number[]) {
    return Random.getRandom(seed) <= 0.5;
  }

  /**
   * Gets a random point of a sphere, evenly distributed over the sphere.
   * The sphere is centered at (x0,y0,z0) with the passed in radius.
   * The returned point is returned as a three element array [x,y,z].
   *
   * @return [x,y,z]
   */
  public static getRandomPointInSphere(radius: number, x0: number, y0: number, z0: number) {
    if (!x0) {
      x0 = 0;
    }
    if (!y0) {
      y0 = 0;
    }
    if (!z0) {
      z0 = 0;
    }

    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(1 - 2 * v);
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    var z = z0 + radius * Math.cos(phi);

    return [x, y, z];
  }
}
