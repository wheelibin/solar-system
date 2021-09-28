export type SolarSystemEntity = {
  id: number;
  name: string;
  entityType: EntityType;
  seed: number[];
  radius: number;
  terrainHeight: number;
  satellites: SolarSystemEntity[];
  orbitEntityId: number;
  orbitRadius: number;
  orbitDirection: number;
  orbitSpeed: number;
  orbitInclanation: number;
  orbitStartPosition: number;
  spinSpeed: number;
  spinDirection: number;

  // A number between 0-1 representing the position in the entire system
  // i.e. distanceFromStar / furthestPlanetDistanceFromStar
  positionInSystem?: number;
  position?: [number, number, number];
  rgb?: [number, number, number];

  // for multi item entities (e.g. asteroid belt)
  maxRadius?: number;
  itemCount?: number;
};

export type SolarSystem = {
  stars: SolarSystemEntity[];
};

export enum EntityType {
  Star,
  Planet,
  Moon,
  AsteroidBelt,
}
