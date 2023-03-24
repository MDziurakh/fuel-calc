import React, { useEffect } from "react";
import { ReactComponent as Fuel } from "../../assets/icons/fuel.svg";
import { ReactComponent as Distance } from "../../assets/icons/distance.svg";
import { ReactComponent as Consumption } from "../../assets/icons/consumption.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Melting } from "../../assets/icons/melting.svg";
import { ReactComponent as Raise } from "../../assets/icons/raise.svg";
import { ReactComponent as Rolling } from "../../assets/icons/rolling.svg";
import { ReactComponent as Upside } from "../../assets/icons/upside.svg";
import { ReactComponent as Zany } from "../../assets/icons/zany.svg";

interface ICalculationsList {
  onRemoveCalculateItem: (id: string) => void;
  clearStorageData:()=>void
  allData: Array<{
    fuel: number;
    distance: number;
    consumption: string;
    id: string;
  }>;
}

const CalculationsList: React.FC<ICalculationsList> = ({
  allData,
  onRemoveCalculateItem,
  clearStorageData
}) => {
  const svgArray = [{ "nameOfSVGComponent": <Melting /> }, { "nameOfSVGComponent": <Raise /> },{'nameOfSVGComponent':<Rolling/>}, {'nameOfSVGComponent':<Upside/>}, {'nameOfSVGComponent':<Zany/>}];
  const rndInt = Math.floor(Math.random() * svgArray.length)
  // useEffect(()=>{

  // },[])

  return (
    <>
      {allData.length ? (
        <ul className="calc-list">  
        <button className="clear-btn" onClick={clearStorageData}>Clear history</button>
          {allData.map((item) => (
            // <li key={item.distance + item.fuel}>
            <li key={item.id}>
              <span onClick={() => onRemoveCalculateItem(item.id)}>
                <Close />
              </span>
              <p>
                <Distance /> <span>Distance - {item.distance}km</span>
              </p>
              <p>
                <Fuel fill="#2e6796" /> <span>Fuel - {item.fuel}L</span>
              </p>
              <p>
                <Consumption />
                <span>Consumption - {item.consumption}L/100km</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-list-svg-container">{svgArray[rndInt].nameOfSVGComponent}</div>
      )}
    </>
  );
};

export default CalculationsList;
