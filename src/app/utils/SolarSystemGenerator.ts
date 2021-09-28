import { EntityType, SolarSystem, SolarSystemEntity } from "../models/SolarSystem";
import { planetNames } from "./planetNames";
import { Random } from "./Random";

// some real values from our own solar system to work from
// distance in km, speeds in km/h
const solarSystemValues = {
  solRadius: 695508,

  earthOrbitSpeed: 110000,

  minPlanetRadius: 2440, // mercury
  maxPlanetRadius: 69911, // jupiter

  minPlanetOrbitRadius: 59223859, // mercury
  maxPlanetOrbitRadius: 4498438348, // neptune

  maxPlanetOrbitSpeed: 172331, //mercury

  minMoonOrbitRadius: 384400, // luna
  maxMoonOrbitRadius: 1882709, // callisto

  maxMoonOrbitSpeed: 62400, // io

  // todo: gas planets spin fast than solid ones, factor this in when
  // more planet types added
  minPlanetSpinSpeed: 6.52, // venus
  maxPlanetSpinSpeed: 45583, //jupiter

  minDistanceBetweenPlanets: 41400000, //earth->venus

  // https://www.nasa.gov/image-feature/picturing-our-solar-systems-asteroid-belt
  minAsteroidSize: 200, //10,
  maxAsteroidSize: 530,

  // our asteroid belt sits between mars and jupiter
  // so use that as a basis for including an asteroid belt or not
  marsToJupiterDistance: 550390000,
};

export const seedIndexes = {
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
  rotation: 13,
  scale: 14,
  itemCount: 15,
};

export class SolarSystemGenerator {
  private entityId = 0;
  private seed: number;

  private solarSystem: SolarSystem = {
    stars: [],
  };

  constructor(seed: number) {
    this.seed = seed;
  }

  private getNextId(): number {
    this.entityId++;
    return this.entityId;
  }

  public generate(starRadius: number = 695508): SolarSystem {
    const stars: SolarSystemEntity[] = [
      {
        entityType: EntityType.Star,
        id: this.getNextId(),
        name: `Star ${this.entityId}`,
        seed: [this.seed, 0],
        position: [0, 0, 0],
        radius: starRadius,
        terrainHeight: 0,
        satellites: [],
        orbitEntityId: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitDirection: 0,
        orbitInclanation: 0,
        orbitStartPosition: 0,
        spinSpeed: Random.getRandomFloat(0.0001, 0.0003, [...[this.seed, 0], seedIndexes.spinSpeed]),
        spinDirection: Random.coinToss([...[this.seed, 0], seedIndexes.spinDirection]) ? 1 : -1,
      },
    ];

    for (let starIndex = 0; starIndex < stars.length; starIndex++) {
      const star = stars[starIndex];
      const baseSeed = [this.seed, starIndex];

      const numberOfPlanets = Random.getRandomInt(1, 9, [...baseSeed, seedIndexes.numberOfPlanets]);

      // generate random planet orbit radiuses
      const planetOrbitRadiuses = this.createPlanetOrbitRadiuses(numberOfPlanets, baseSeed);

      for (let planetIndex = 0; planetIndex < numberOfPlanets; planetIndex++) {
        const baseSeed = [this.seed, starIndex, planetIndex];

        const planetRadius = Random.getRandomInt(
          solarSystemValues.minPlanetRadius,
          solarSystemValues.maxPlanetRadius * 2,
          [...baseSeed, seedIndexes.radius]
        );

        const planet = this.createPlanet(
          planetIndex,
          baseSeed,
          planetRadius,
          numberOfPlanets,
          planetOrbitRadiuses[planetIndex],
          star
        );

        // create the moons for the planet
        const numberOfMoons = Random.getRandomInt(1, 10, [...baseSeed, seedIndexes.numberOfPlanets]);

        // generate random moon orbit radiuses
        const moonOrbitRadiuses = new Array(numberOfMoons)
          .fill(null)
          .map((item, index) =>
            Random.getRandomInt(solarSystemValues.minMoonOrbitRadius, solarSystemValues.maxMoonOrbitRadius, [
              ...baseSeed,
              seedIndexes.orbitRadius,
              index,
            ])
          )
          .sort((a, b) => a - b);

        for (let moonIndex = 0; moonIndex < numberOfMoons; moonIndex++) {
          const baseSeed = [this.seed, starIndex, planetIndex, moonIndex];

          const moonRadius = Random.getRandomInt(planetRadius / 12, planetRadius / 3, [
            ...baseSeed,
            seedIndexes.radius,
          ]);

          const moon = this.createMoon(moonIndex, baseSeed, moonRadius, moonOrbitRadiuses[moonIndex], numberOfMoons);
          planet.satellites.push(moon);
        }
        // Calculate orbit speeds based on distance from planet
        for (const moon of planet.satellites) {
          const distanceFromPlanet = moon.orbitRadius;
          const furthestMoonOrbitRadius = planet.satellites[planet.satellites.length - 1].orbitRadius;
          const ratio = 1.5 - distanceFromPlanet / furthestMoonOrbitRadius;
          moon.orbitSpeed = ratio * solarSystemValues.maxMoonOrbitSpeed;
        }

        star.satellites.push(planet);

        // if there's a big enough gap between planets, add an asteroid belt
        if (planetIndex < numberOfPlanets - 1 && star.satellites.every((s) => s.entityType === EntityType.Planet)) {
          const r1 = planetOrbitRadiuses[planetIndex];
          const r2 = planetOrbitRadiuses[planetIndex + 1];
          const numberOfAsteroids = Random.getRandomInt(500, 2000, [...baseSeed, planetIndex, seedIndexes.itemCount]);
          if (r2 - r1 > solarSystemValues.marsToJupiterDistance) {
            star.satellites.push({
              entityType: EntityType.AsteroidBelt,
              id: this.getNextId(),
              name: "",
              seed: [...baseSeed, planetIndex],
              radius: solarSystemValues.minAsteroidSize,
              maxRadius: solarSystemValues.maxAsteroidSize,
              terrainHeight: 1,
              satellites: [],
              orbitEntityId: star.id,
              orbitRadius: r1 + (r2 - r1) / 2,
              orbitDirection: 1,
              orbitSpeed: 1,
              orbitInclanation: 0,
              orbitStartPosition: 0,
              spinSpeed: 0,
              spinDirection: 1,
              itemCount: numberOfAsteroids,
            });
          }
        }
      }

      // Calculate orbit speeds based on distance from star
      for (const planet of star.satellites) {
        const distanceFromStar = planet.orbitRadius;
        const furthestPlanetOrbitRadius = star.satellites[star.satellites.length - 1].orbitRadius;
        const ratio = 1.5 - distanceFromStar / furthestPlanetOrbitRadius;
        planet.positionInSystem = distanceFromStar / furthestPlanetOrbitRadius;
        planet.orbitSpeed = ratio * solarSystemValues.maxPlanetOrbitSpeed;
      }

      this.solarSystem.stars.push(star);
    }

    return this.solarSystem;
  }

  private createPlanetOrbitRadiuses(numberOfPlanets: number, baseSeed: number[]) {
    const planetOrbitRadiuses = new Array(numberOfPlanets)
      .fill(null)
      .map((item, index) =>
        Random.getRandomInt(solarSystemValues.minPlanetOrbitRadius, solarSystemValues.maxPlanetOrbitRadius, [
          ...baseSeed,
          seedIndexes.orbitRadius,
          index,
        ])
      )
      .sort((a, b) => a - b);

    // Ensure a min distance between planets
    for (let i = 0; i < planetOrbitRadiuses.length - 1; i++) {
      const po1 = planetOrbitRadiuses[i];
      const po2 = planetOrbitRadiuses[i + 1];

      const distanceBetween = po2 - po1;

      if (distanceBetween < solarSystemValues.minDistanceBetweenPlanets) {
        // if the distance is too small, push all outer planets away by the difference and carry on the loop
        for (let index = i + 1; index < planetOrbitRadiuses.length; index++) {
          planetOrbitRadiuses[index] += solarSystemValues.minDistanceBetweenPlanets - distanceBetween;
        }
      }
    }

    return planetOrbitRadiuses;
  }

  private createMoon(index: number, baseSeed: number[], radius: number, orbitRadius: number, numberOfMoons: number) {
    const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;

    const randomSpinSpeed = Random.getRandomFloat(0.001, 0.005, [...baseSeed, seedIndexes.spinSpeed]);

    const moon: SolarSystemEntity = {
      entityType: EntityType.Moon,
      id: this.getNextId(),
      name: `Moon ${index + 1}`,
      seed: baseSeed,
      radius: radius,
      terrainHeight: Random.getRandom([...baseSeed, seedIndexes.terrainHeight]),
      orbitEntityId: -1,
      orbitRadius: orbitRadius,
      orbitDirection: randomOrbitDirection,
      orbitSpeed: (numberOfMoons - index) / numberOfMoons,
      orbitInclanation: Random.getRandomInt(0, 45, [...baseSeed, seedIndexes.orbitInclanation]),
      orbitStartPosition: Random.getRandom([...baseSeed, seedIndexes.orbitStartPosition]),
      spinSpeed: randomSpinSpeed,
      spinDirection: Random.coinToss([...baseSeed, seedIndexes.spinDirection]) ? 1 : -1,
      rgb: getRandomRgb([...baseSeed, seedIndexes.colour]),
      satellites: [],
    };

    return moon;
  }

  private createPlanet(
    index: number,
    baseSeed: number[],
    radius: number,
    numberOfPlanets: number,
    orbitRadius: number,
    star: SolarSystemEntity
  ) {
    const randomOrbitDirection = Random.coinToss([...baseSeed, seedIndexes.orbitDirection]) ? 1 : -1;
    const randomSpinSpeed = Random.getRandomFloat(0.002, 0.006, [...baseSeed, seedIndexes.spinSpeed]);
    const planetName = Random.getRandomFromArray(planetNames, [...baseSeed, seedIndexes.planetName]);

    // create the planet
    const planet: SolarSystemEntity = {
      entityType: EntityType.Planet,
      id: this.getNextId(),
      name: planetName,
      seed: baseSeed,
      radius: radius,
      terrainHeight: 1,
      orbitEntityId: star.id,
      orbitRadius: orbitRadius,
      orbitDirection: randomOrbitDirection,
      orbitSpeed: (numberOfPlanets - index) / numberOfPlanets,
      orbitInclanation: Random.getRandomInt(0, 15, [...baseSeed, seedIndexes.orbitInclanation]),
      orbitStartPosition: Random.getRandom([...baseSeed, seedIndexes.orbitStartPosition]),
      spinSpeed: randomSpinSpeed,
      spinDirection: Random.coinToss([...baseSeed, seedIndexes.spinDirection]) ? 1 : -1,
      satellites: [],
    };

    return planet;
  }
}

const getRandomRgb = (seed: number[]): [number, number, number] => {
  return [
    Random.getRandomFloat(0.6, 1, [...seed, 0]),
    Random.getRandomFloat(0.6, 1, [...seed, 1]),
    Random.getRandomFloat(0.6, 1, [...seed, 2]),
  ];
};
