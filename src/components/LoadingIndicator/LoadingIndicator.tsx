import React from "react";

import "./LoadingIndicator.css";

type Props = {
  show?: boolean;
};

const verbs = [
  "annihilating",
  "balancing",
  "charging",
  "colliding",
  "combining",
  "dispatching",
  "exciting",
  "firing",
  "generating",
  "initialising",
  "inflating",
  "isolating ",
  "manifesting",
  "measuring",
  "mining",
  "normalising",
  "randomising",
  "scintilating",
  "stabilising",
  "televising",
  "unifying",
];

const adjectives = [
  "asynchronous",
  "correlating",
  "crystaline",
  "high-energy",
  "homologous",
  "isomorphic",
  "molecular",
  "multi-valent ",
  "non-interacting",
  "resonant",
  "self-coupling",
  "subatomic",
  "supersymmetrical",
  "superconductive",
  "synchronous",
  "unstable",
  "vibrational",
  "zero-spin",
];

const nouns = [
  "astral fields",
  "atomic gases",
  "bose-einstein condensate",
  "consciousness",
  "design elements",
  "elementry particles",
  "gravity wells",
  "harmonics",
  "higgs field",
  "light quanta",
  "meson clouds",
  "neutron masses",
  "phase transitions",
  "photons",
  "physics",
  "plasma",
  "quantum states",
  "relativistic speeds",
  "scalar fields",
  "singularities",
  "space-time fragmentation",
  "string theory",
  "superfluids",
  "vector bosons",
  "warp fields",
  "wave functions",
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
