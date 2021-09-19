import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { SolarSystemApp } from "../app/SolarSystemApp";

type Props = {
  solarSystemApp: SolarSystemApp;
};

export const App: React.FC<Props> = ({ solarSystemApp }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    solarSystemApp.init();
    solarSystemApp.onInitialising = handleInitialising;
    solarSystemApp.onInitialised = handleInitialised;
  }, [solarSystemApp]);

  const handleInitialising = () => {
    setIsLoading(true);
  };

  const handleInitialised = () => {
    setIsLoading(false);
  };

  return <LoadingIndicator show={isLoading} />;
};
