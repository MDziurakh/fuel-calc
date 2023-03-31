import React, { useMemo } from "react";

import { ReactComponent as Fuel } from "../../assets/icons/fuel.svg";
import { ReactComponent as Distance } from "../../assets/icons/distance.svg";
import { ReactComponent as Consumption } from "../../assets/icons/consumption.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

import { ReactComponent as Melting } from "../../assets/icons/melting.svg";
import { ReactComponent as Raise } from "../../assets/icons/raise.svg";
import { ReactComponent as Rolling } from "../../assets/icons/rolling.svg";
import { ReactComponent as Upside } from "../../assets/icons/upside.svg";
import { ReactComponent as Zany } from "../../assets/icons/zany.svg";

import { IAllDataItem } from "../../App";

interface ICalculationsList {
  onRemoveCalculateItem: (id: string) => void;
  clearStorageData: () => void;
  appDataState: Array<IAllDataItem>;
}

const CalculationsList: React.FC<ICalculationsList> = ({
  appDataState,
  onRemoveCalculateItem,
  clearStorageData,
}) => {
  const svgArray = [
    { nameOfSVGComponent: <Melting /> },
    { nameOfSVGComponent: <Raise /> },
    { nameOfSVGComponent: <Rolling /> },
    { nameOfSVGComponent: <Upside /> },
    { nameOfSVGComponent: <Zany /> },
  ];

  const randomNumber = useMemo(
    () => Math.floor(Math.random() * svgArray.length),
    [svgArray.length]
  );

  return (
    <>
      {appDataState.length ? (
        <ul className="calc-list">
          <button className="clear-btn" onClick={clearStorageData}>
            Clear history
          </button>
          {appDataState.map((item) => (
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
        <div className="empty-list-svg-container">
          {svgArray[randomNumber].nameOfSVGComponent}
        </div>
      )}
    </>
  );
};

export default CalculationsList;
