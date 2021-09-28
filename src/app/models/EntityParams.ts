import { Color } from "three";
import { Entity } from "../entities/Entity";
import { SolarSystemEntity } from "./SolarSystem";

type _EntityParams = {
  orbitEntity?: Entity;
  colour?: Color;
  castShadow?: boolean;
  receiveShadow?: boolean;
  texturePath?: string;
  onShow?: (id: number) => void;
  hasLabel?: boolean;
};

export type EntityParams = SolarSystemEntity & _EntityParams;
