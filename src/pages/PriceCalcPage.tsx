import React from "react";
import { IAllDataItem, IPriceFormState } from "../App";
import PriceForm from "../components/PriceForm/PriceForm";

import "./PriceCalcPage.scss";

interface IPriceCalcPage {
  priceConsumption: string;
  appDataState: Array<IAllDataItem>;
  onPriceCalculate: (
    e: React.ChangeEvent<HTMLFormElement>,
    manualConsumptionInput: number
  ) => void;
  

  priceFormState:IPriceFormState;
  setPiceFormState: React.Dispatch<React.SetStateAction<IPriceFormState>>
  priceFormInputsData : IPriceFormState;
}

const PriceCalcPage: React.FC<IPriceCalcPage> = ({
  appDataState,
  onPriceCalculate,
  

  priceConsumption,
  
  priceFormState, 
  setPiceFormState,
  priceFormInputsData
}) => {
  let lastConsumptionCheck =
    appDataState.length > 0 ? +appDataState[appDataState.length - 1].consumption : "";

  return (
    <div className="price-page-wrapper wrapper">
      <h1>Calculate price of your ride</h1>
      <div className="price-form-block form-block">
        <PriceForm
          onPriceCalculate={onPriceCalculate}
          priceConsumption={priceConsumption}
          lastConsumption={lastConsumptionCheck}
          
          priceFormState={priceFormState}
          setPriceFormState={setPiceFormState}
          priceFormInputsData={priceFormInputsData}

        />
        <div className="price-calc-consumption">
          <h4>
            {priceConsumption.length
              ? priceConsumption 
              : "Here will be displayed your price"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PriceCalcPage;
