import { Random } from "./Random";

type SolarSystemEntity = {
  id: number;
  name: string;
  seed: number[];
  radius: number;
  terrainHeight: number;
  moons: SolarSystemEntity[];
  orbitEntityId: number;
  orbitRadius: number;
  orbitDirection: number;
  orbitSpeed: number;
  spinSpeed: number;

  position?: [number, number, number];
  rgb?: [number, number, number];
};

export type SolarSystem = {
  suns: SolarSystemEntity[];
  planets: SolarSystemEntity[];
};

const seedIndexes = {
  radius: 0,
  terrainHeight: 1,
  colour: 2,
  noiseMap: 3,
  orbitDirection: 4,
  orbitSpeed: 5,
  spinSpeed: 6,
  numberOfPlanets: 7,
  orbitRadius: 8,
};

export class SolarSystemGenerator {
  private EntityId = 0;

  private getNextId(): number {
    this.EntityId++;
    return this.EntityId;
  }

  public generate(seed: number): SolarSystem {
    const solarSystem: SolarSystem = {
      suns: [],
      planets: [],
    };

    const suns: SolarSystemEntity[] = [
      {
        id: this.getNextId(),
        name: `Sun ${this.EntityId}`,
        seed: [seed, 0],
        position: [0, 0, 0],
        radius: 1280,
        terrainHeight: 0,
        moons: [],
        orbitEntityId: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitDirection: 0,
        spinSpeed: Random.getRandomFloat(0.0001, 0.0003, [...[seed, 0], seedIndexes.spinSpeed]),
      },
    ];

    for (let sunIndex = 0; sunIndex < suns.length; sunIndex++) {
      const sun = suns[sunIndex];

      const numberOfPlanets = Random.getRandomInt(1, 9, [seed, sunIndex, seedIndexes.numberOfPlanets]);

      for (let planetIndex = 0; planetIndex < numberOfPlanets; planetIndex++) {
        const baseSeed = [seed, sunIndex, planetIndex];

        const planetRadius = Random.getRandomInt(sun.radius * 0.1, sun.radius * 0.3, [...baseSeed, seedIndexes.radius]);
        const numberOfMoons = Random.getRandomInt(1, 5, [...baseSeed, seedIndexes.numberOfPlanets]);

        // create the moons for the planet
        const planetMoons = [];
        for (let moonIndex = 0; moonIndex < numberOfMoons; moonIndex++) {
          const baseSeed = [seed, sunIndex, planetIndex, moonIndex];
          const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;
          const randomOrbitSpeed = Random.getRandomFloat(0.001, 0.005, [...baseSeed, seedIndexes.orbitSpeed]);
          const randomSpinSpeed = Random.getRandomFloat(0.001, 0.005, [...baseSeed, seedIndexes.spinSpeed]);
          const minOrbitRadius = Random.getRandomInt(planetRadius * 3 * 0.5, planetRadius * 4, [
            ...baseSeed,
            seedIndexes.orbitRadius,
            0,
          ]);

          const moon: SolarSystemEntity = {
            id: this.getNextId(),
            name: `Moon ${moonIndex}`,
            seed: baseSeed,
            radius: Random.getRandomInt(planetRadius / 24, planetRadius / 8, [...baseSeed, seedIndexes.radius]),
            terrainHeight: Random.getRandomInt(1, 10, [...baseSeed, seedIndexes.terrainHeight]),
            orbitEntityId: -1,
            orbitRadius:
              moonIndex === 0
                ? minOrbitRadius
                : planetMoons[moonIndex - 1].orbitRadius +
                  Random.getRandomInt(minOrbitRadius * 0.2, minOrbitRadius, [...baseSeed, seedIndexes.orbitRadius, 1]),
            orbitDirection: randomOrbitDirection,
            orbitSpeed: randomOrbitSpeed,
            spinSpeed: randomSpinSpeed,
            rgb: getRandomRgb([...baseSeed, seedIndexes.colour]),
            moons: [],
          };

          planetMoons.push(moon);
        }

        // now create the planet - ensuring the orbit is large enough to accomodate all the moons
        const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;
        const randomOrbitSpeed = Random.getRandomFloat(0.001, 0.005, [...baseSeed, seedIndexes.orbitSpeed]);
        const randomSpinSpeed = Random.getRandomFloat(0.002, 0.006, [...baseSeed, seedIndexes.spinSpeed]);
        const orbitRadiusInc = Random.getRandomInt(
          planetMoons[planetMoons.length - 1].orbitRadius * 1.1,
          planetMoons[planetMoons.length - 1].orbitRadius * 2,
          [...baseSeed, seedIndexes.orbitRadius, 0]
        );

        // ensure orbits of planets/moons don't overlap
        const prevPlanet =
          solarSystem.planets.length > 0 ? solarSystem.planets[solarSystem.planets.length - 1] : undefined;
        const prevPlanetOrbitRadius = planetIndex === 0 ? orbitRadiusInc : prevPlanet!.orbitRadius;
        const prevPlanetMoonRadius =
          planetIndex === 0 ? 0 : prevPlanet!.moons[prevPlanet!.moons.length - 1].orbitRadius;
        const currentPlanetMoonRadius = planetMoons[planetMoons.length - 1].orbitRadius;
        const orbitPadding = planetRadius;

        // create the planet
        const planet: SolarSystemEntity = {
          id: this.getNextId(),
          name: `Planet ${planetIndex}`,
          seed: baseSeed,
          radius: planetRadius,
          terrainHeight: 8,
          orbitEntityId: sun.id,
          orbitRadius: prevPlanetOrbitRadius + prevPlanetMoonRadius + currentPlanetMoonRadius + orbitPadding,
          orbitDirection: randomOrbitDirection,
          orbitSpeed: randomOrbitSpeed,
          spinSpeed: randomSpinSpeed,
          moons: planetMoons,
        };

        solarSystem.planets.push(planet);
      }

      solarSystem.suns.push(sun);
    }

    return solarSystem;
  }
}

const getRandomRgb = (seed: number[]): [number, number, number] => {
  return [
    Random.getRandomFloat(0.6, 1, [...seed, 0]),
    Random.getRandomFloat(0.6, 1, [...seed, 1]),
    Random.getRandomFloat(0.6, 1, [...seed, 2]),
  ];
};
