import React from "react";

import "./LoadingIndicator.css";

type Props = {
  show?: boolean;
};

const verbs = [
  "annihilating",
  "balancing",
  "brewing",
  "charging",
  "dispatching",
  "exciting",
  "generating",
  "initialising",
  "isolating ",
  "letting loose",
  "manifesting",
  "mining",
  "randomising",
  "scintilating",
  "televising",
];

const adjectives = [
  "asynchronous",
  "correlating",
  "crystaline",
  "high-energy",
  "isomorphic",
  "molecular",
  "multi-valent ",
  "resonant",
  "vibrational",
];

const nouns = [
  "astral fields",
  "astral planes",
  "bose-einstein condensate",
  "consciousness",
  "design elements",
  "gravity wells",
  "harmonics",
  "lightening fields",
  "meson clouds",
  "neutron masses",
  "physics",
  "plasma",
  "relativistic speeds",
  "singularities",
  "space-time fragmentation",
  "string theory",
  "warp fields",
];

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomArrayValue = (array: any[]) => {
  return array[randomIntFromInterval(0, array.length - 1)];
};

const getRandomMessage = () => {
  return `${randomArrayValue(verbs)} ${randomArrayValue(adjectives)} ${randomArrayValue(nouns)}...`;
};

export const LoadingIndicator: React.FC<Props> = ({ show }) => {
  if (!show) {
    return null;
  }

  return <div className="loading-indicator">{getRandomMessage()}</div>;
};
