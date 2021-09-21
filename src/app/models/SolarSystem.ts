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
