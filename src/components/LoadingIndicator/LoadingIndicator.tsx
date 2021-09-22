import React from "react";
// import { Random } from "../../app/utils/Random";

import "./LoadingIndicator.css";

type Props = {
  show?: boolean;
};

const loadingMessages = ["Generating Solar System"];

export const LoadingIndicator: React.FC<Props> = ({ show }) => {
  return show ? <div className="loading-indicator">{loadingMessages[0]}...</div> : null;
};
