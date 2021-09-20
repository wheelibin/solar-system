import { planetNames } from "./planetNames";
import { Random } from "./Random";

export type SolarSystemEntity = {
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
  orbitInclanation: number;
  orbitStartPosition: number;
  spinSpeed: number;
  spinDirection: number;

  position?: [number, number, number];
  rgb?: [number, number, number];
};

export type SolarSystem = {
  stars: SolarSystemEntity[];
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
  orbitInclanation: 9,
  spinDirection: 10,
  orbitStartPosition: 11,
  planetName: 12,
};

export class SolarSystemGenerator {
  private EntityId = 0;

  private getNextId(): number {
    this.EntityId++;
    return this.EntityId;
  }

  public generate(seed: number): SolarSystem {
    const solarSystem: SolarSystem = {
      stars: [],
      planets: [],
    };

    const stars: SolarSystemEntity[] = [
      {
        id: this.getNextId(),
        name: `Star ${this.EntityId}`,
        seed: [seed, 0],
        position: [0, 0, 0],
        radius: 1280,
        terrainHeight: 0,
        moons: [],
        orbitEntityId: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitDirection: 0,
        orbitInclanation: 0,
        orbitStartPosition: 0,
        spinSpeed: Random.getRandomFloat(0.0001, 0.0003, [...[seed, 0], seedIndexes.spinSpeed]),
        spinDirection: Random.coinToss([...[seed, 0], seedIndexes.spinDirection]) ? 1 : -1,
      },
    ];

    for (let starIndex = 0; starIndex < stars.length; starIndex++) {
      const star = stars[starIndex];

      // const oneAU = star.radius * 215;
      // const neptuneOrbitRadius = oneAU * 30;

      const numberOfPlanets = Random.getRandomInt(1, 9, [seed, starIndex, seedIndexes.numberOfPlanets]);

      for (let planetIndex = 0; planetIndex < numberOfPlanets; planetIndex++) {
        const baseSeed = [seed, starIndex, planetIndex];

        // let's base our planet sizes off something from reality
        // choose a size somewhere between mercury and double jupiter
        const jupiterRadius = star.radius / 10;
        const mercuryRadius = star.radius / 327;

        const planetRadius = Random.getRandomInt(mercuryRadius, jupiterRadius * 2, [...baseSeed, seedIndexes.radius]);
        const numberOfMoons = Random.getRandomInt(1, 10, [...baseSeed, seedIndexes.numberOfPlanets]);

        // create the moons for the planet
        const planetMoons = [];
        for (let moonIndex = 0; moonIndex < numberOfMoons; moonIndex++) {
          const baseSeed = [seed, starIndex, planetIndex, moonIndex];
          const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;

          const randomSpinSpeed = Random.getRandomFloat(0.001, 0.005, [...baseSeed, seedIndexes.spinSpeed]);
          const minOrbitRadius = Random.getRandomInt(planetRadius * 3 * 0.5, planetRadius * 4, [
            ...baseSeed,
            seedIndexes.orbitRadius,
            0,
          ]);
          const orbitRadius =
            moonIndex === 0
              ? minOrbitRadius
              : planetMoons[moonIndex - 1].orbitRadius +
                Random.getRandomInt(minOrbitRadius * 0.2, minOrbitRadius, [...baseSeed, seedIndexes.orbitRadius, 1]);
          const moonRadius = Random.getRandomInt(planetRadius / 12, planetRadius / 4, [
            ...baseSeed,
            seedIndexes.radius,
          ]);

          const moon: SolarSystemEntity = {
            id: this.getNextId(),
            name: `Moon ${moonIndex + 1}`,
            seed: baseSeed,
            radius: moonRadius,
            terrainHeight: Random.getRandom([...baseSeed, seedIndexes.terrainHeight]),
            orbitEntityId: -1,
            orbitRadius: orbitRadius,
            orbitDirection: randomOrbitDirection,
            orbitSpeed: (numberOfMoons - moonIndex) / numberOfMoons,
            orbitInclanation: Random.getRandomInt(0, 45, [...baseSeed, seedIndexes.orbitInclanation]),
            orbitStartPosition: Random.getRandom([...baseSeed, seedIndexes.orbitStartPosition]),
            spinSpeed: randomSpinSpeed,
            spinDirection: Random.coinToss([...baseSeed, seedIndexes.spinDirection]) ? 1 : -1,
            rgb: getRandomRgb([...baseSeed, seedIndexes.colour]),
            moons: [],
          };

          planetMoons.push(moon);
        }

        // now create the planet - ensuring the orbit is large enough to accomodate all the moons
        const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;
        const randomSpinSpeed = Random.getRandomFloat(0.002, 0.006, [...baseSeed, seedIndexes.spinSpeed]);

        // ensure orbits of planets/moons don't overlap
        const prevPlanet =
          solarSystem.planets.length > 0 ? solarSystem.planets[solarSystem.planets.length - 1] : undefined;
        const currentPlanetMoonRadius = planetMoons[planetMoons.length - 1].orbitRadius;
        const firstPlanetOrbitRadius = Random.getRandomInt(currentPlanetMoonRadius * 1.5, currentPlanetMoonRadius * 3, [
          ...baseSeed,
          seedIndexes.orbitRadius,
          0,
        ]);
        const prevPlanetOrbitRadius = planetIndex === 0 ? firstPlanetOrbitRadius : prevPlanet!.orbitRadius;
        const prevPlanetMoonRadius =
          planetIndex === 0 ? 0 : prevPlanet!.moons[prevPlanet!.moons.length - 1].orbitRadius;
        const orbitPadding = planetRadius;
        const planetName = Random.getRandomFromArray(planetNames, [...baseSeed, seedIndexes.planetName]);

        // create the planet
        const planet: SolarSystemEntity = {
          id: this.getNextId(),
          name: planetName,
          seed: baseSeed,
          radius: planetRadius,
          terrainHeight: 1,
          orbitEntityId: star.id,
          orbitRadius: prevPlanetOrbitRadius + prevPlanetMoonRadius + currentPlanetMoonRadius + orbitPadding,
          orbitDirection: randomOrbitDirection,
          orbitSpeed: (numberOfPlanets - planetIndex) / numberOfPlanets,
          orbitInclanation: Random.getRandomInt(0, 15, [...baseSeed, seedIndexes.orbitInclanation]),
          orbitStartPosition: Random.getRandom([...baseSeed, seedIndexes.orbitStartPosition]),
          spinSpeed: randomSpinSpeed,
          spinDirection: Random.coinToss([...baseSeed, seedIndexes.spinDirection]) ? 1 : -1,
          moons: planetMoons,
        };

        solarSystem.planets.push(planet);
      }

      solarSystem.stars.push(star);
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
