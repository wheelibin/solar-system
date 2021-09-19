import React from "react";

import "./LoadingIndicator.css";

type Props = {
  show?: boolean;
};

export const LoadingIndicator: React.FC<Props> = ({ show }) => {
  return show ? <div className="loading-indicator">Generating Solar System...</div> : null;
};
