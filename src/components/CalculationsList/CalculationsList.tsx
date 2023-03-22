import React from "react";
import { ReactComponent as Fuel } from "../../assets/icons/fuel.svg";
import { ReactComponent as Distance } from "../../assets/icons/distance.svg";
import { ReactComponent as Consumption } from "../../assets/icons/consumption.svg";

interface ICalculationsList {
  allData: Array<{ fuel: number; distance: number; consumption?: string }>;
}

const CalculationsList: React.FC<ICalculationsList> = ({ allData }) => {
  return (
    <>
      <ul className="calc-list">
        
        {allData.map((item) => (
          <li key={item.distance + item.fuel}>
            <p><Distance/> Distance - {item.distance}km</p>
            <p><Fuel fill="#2e6796"/> Fuel - {item.fuel}L</p>
            <p><Consumption />Consumption - {item.consumption}L/100km</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CalculationsList;
