import React from "react";
import PriceForm from "../components/PriceForm/PriceForm";

import "./PriceCalcPage.scss";

interface IPriceCalcPage {
  priceConsumption: string;
  allData: Array<{ fuel: number; distance: number; consumption: string }>;
  onPriceCalculate: (
    e: React.ChangeEvent<HTMLFormElement>,
    manualConsumptionInput: number
  ) => void;
  priceCalculateInput: number | string;
  priceFormInput: number;
  setPriceFormInput: React.Dispatch<React.SetStateAction<number>>;
  setPriceCalculateInput: React.Dispatch<React.SetStateAction<number | string>>;
}

const PriceCalcPage: React.FC<IPriceCalcPage> = ({
  allData,
  onPriceCalculate,
  priceCalculateInput,
  priceConsumption,
  priceFormInput,
  setPriceFormInput,
  setPriceCalculateInput,
}) => {
  let lastConsumptionCheck =
    allData.length > 0 ? +allData[allData.length - 1].consumption : "";

  return (
    <div className="price-page-wrapper wrapper">
      <h1>Calculate price of your ride</h1>
      <div className="price-form-block form-block">
        <PriceForm
          onPriceCalculate={onPriceCalculate}
          priceCalculateInput={priceCalculateInput}
          setPriceCalculateInput={setPriceCalculateInput}
          priceConsumption={priceConsumption}
          lastConsumption={lastConsumptionCheck}
          priceFormInput={priceFormInput}
          setPriceFormInput={setPriceFormInput}
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
