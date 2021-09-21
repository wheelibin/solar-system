import { SolarSystemEntity } from "../../app/models/SolarSystem";
import "./PlanetDataSheet.css";

type Props = {
  planet?: SolarSystemEntity;
};

export const PlanetDataSheet: React.FC<Props> = ({ planet }) => {
  if (!planet) {
    return null;
  }

  const properties = [
    ["Name", planet.name],
    ["Moons", planet.moons.length],
    ["Orbital Inclanation", `${planet.orbitInclanation}°`],
  ];

  return (
    <div className="planet-datasheet">
      <h2>Planet Info</h2>

      <ul className="planet-datasheet__property-list">
        {properties.map((prop) => (
          <li key={prop[0]} className="planet-datasheet__property">
            <strong>{prop[0]}</strong>
            <p>{prop[1]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
