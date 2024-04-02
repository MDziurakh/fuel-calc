import React, { Dispatch, useEffect } from "react";
import { IConsumption, IFuelFormState } from "../App";
import ConsumtionForm from "../components/ConsumtionForm/ConsumtionForm";
import ReactGA from "react-ga4";

import "./MainPage.scss";

import { ReactComponent as Copy } from "../assets/icons/copy.svg";

interface IMainPage {
  appDataState: Array<{ fuel: number; distance: number; consumption: string }>;
  showCopyMessage: boolean;
  fuelFormInputsData: IFuelFormState;
  setFuelFormState: Dispatch<React.SetStateAction<IFuelFormState>>;
  onSubmitHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  consumption: IConsumption;
  clearStorageData: () => void;
  onClickCopy: () => void;
}

const MainPage: React.FC<IMainPage> = (props) => {
  const {
    clearStorageData,
    appDataState,
    onSubmitHandler,
    setFuelFormState,
    consumption,
    onClickCopy,
    showCopyMessage,
    fuelFormInputsData,
  } = props;

  // console.log(appDataState);
  useEffect(() => {

    

    ReactGA.send({
      hitType: "pageview",
      page: "/my-path",
      title: "Custom Title",
    });
  }, []);

  return (
    <div className="main-page-wrapper wrapper">
      <h1>
        {appDataState.length
          ? `Last consumption was ${
              appDataState[appDataState.length - 1].consumption
            } L`
          : "Calculate your fuel consumption"}
      </h1>
      <div className="main-form-block form-block">
        <button
          className="clear-btn"
          onClick={clearStorageData}
          disabled={!appDataState.length}
        >
          Clear local storage
        </button>
        <ConsumtionForm
          onSubmitHandler={onSubmitHandler}
          setFuelFormState={setFuelFormState}
          fuelFormInputsData={fuelFormInputsData}
        />
        <div className="consumption-block">
          <h4>
            {consumption.fuelConsumption === 0 ? (
              "Here will be displayed your consumption"
            ) : (
              <>
                {`Consumption - ${
                  consumption.fuelConsumption
                } L/100km, distance - 
                ${appDataState[appDataState.length - 1].distance}km, 
                price - ${consumption.priceResult} UAH`}
                <button
                  className="svg-btn"
                  onClick={onClickCopy}
                  disabled={!consumption.fuelConsumption}
                >
                  <Copy height={30} />
                  <span className={showCopyMessage ? "visible" : ""}>
                    Copied!
                  </span>
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
