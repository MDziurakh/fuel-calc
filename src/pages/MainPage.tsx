import React, { Dispatch } from "react";
import { IConsumption, INewState } from "../App";
import ConsumtionForm from "../components/ConsumtionForm/ConsumtionForm";

import "./MainPage.scss";

import { ReactComponent as Copy } from "../assets/icons/copy.svg";

interface IMainPage {
  allData: Array<{ fuel: number; distance: number; consumption: string }>;
  copyMessage: boolean;
  inputsData: INewState;
  setNewState: Dispatch<React.SetStateAction<INewState>>;
  onSubmitHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  consumption: IConsumption;
  clearStorageData: () => void;
  onClickCopy: () => void;
}

const MainPage: React.FC<IMainPage> = (props) => {
  const {
    clearStorageData,
    allData,
    onSubmitHandler,
    setNewState,
    consumption,
    onClickCopy,
    copyMessage,
    inputsData,
  } = props;

  console.log(allData);
  

  return (
    <div className="main-page-wrapper wrapper">
      <h1>
        {allData.length
          ? `Last consumption was ${allData[allData.length - 1].consumption} L`
          : "Calculate your fuel consumption"}
      </h1>
      <div className="main-form-block form-block">
        <button
          className="clear-btn"
          onClick={clearStorageData}
          disabled={!allData.length}
        >
          Clear local storage
        </button>
        <ConsumtionForm
          onSubmitHandler={onSubmitHandler}
          setNewState={setNewState}
          inputsData={inputsData}
        />
        <div className="consumption-block">
          <h4>
            {consumption.fuelConsumption === 0 ? (
              "Here will be displayed your consumption"
            ) : (
              <>
                {`Consumption - ${consumption.fuelConsumption} L, distance - 
                ${
                  allData[allData.length - 1].distance
                }km
                , price - ${consumption.priceResult} UAH`}
                <button
                  className="svg-btn"
                  onClick={onClickCopy}
                  disabled={!consumption.fuelConsumption}
                >
                  <Copy height={30} />
                  {copyMessage && <span>Copied!</span>}
                </button>
              </>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
