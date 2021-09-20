import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { SolarSystemApp } from "../../app/SolarSystemApp";
import { PlanetDataSheet } from "../PlanetDataSheet/PlanetDataSheet";
import { SolarSystemEntity } from "../../app/utils/SolarSystemGenerator";

type Props = {
  solarSystemApp: SolarSystemApp;
};

export const App: React.FC<Props> = ({ solarSystemApp }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<SolarSystemEntity | undefined>(undefined);

  useEffect(() => {
    solarSystemApp.init();
    solarSystemApp.onInitialising = handleInitialising;
    solarSystemApp.onInitialised = handleInitialised;
    solarSystemApp.onSelectPlanet = handleSelectPlanet;
  }, [solarSystemApp]);

  const handleInitialising = () => {
    setIsLoading(true);
  };

  const handleInitialised = () => {
    setIsLoading(false);
  };

  const handleSelectPlanet = (planet?: SolarSystemEntity) => {
    setSelectedPlanet(planet);
  };

  return (
    <>
      <LoadingIndicator show={isLoading} />
      <PlanetDataSheet planet={selectedPlanet}></PlanetDataSheet>
    </>
  );
};
