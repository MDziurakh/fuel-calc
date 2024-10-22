import React, { useEffect, useState } from "react";
import { IPriceFormState } from "../../App";

interface IPriceForm {
  onPriceCalculate: (
    e: React.ChangeEvent<HTMLFormElement>,
    manualInput: number
  ) => void;
  priceConsumption: string;
  lastConsumption: number | string;
  setPriceFormState: React.Dispatch<React.SetStateAction<IPriceFormState>>;
  priceFormInputsData: IPriceFormState;
  priceFormState: IPriceFormState;
}

const PriceForm: React.FC<IPriceForm> = ({
  onPriceCalculate,
  lastConsumption,
  setPriceFormState,
  priceFormInputsData,
}) => {
  const [consumptionInput, setConsumptionInput] = useState<number | string>(
    lastConsumption
  );

  const { distance, price } = priceFormInputsData;

  useEffect(() => {
    if (lastConsumption) setConsumptionInput(lastConsumption);
  }, [lastConsumption]);

  const isSomeFilled: boolean = !!distance || !!price || !!consumptionInput;

  const onClickClear = (): void => {
    setConsumptionInput("");
    setPriceFormState({ distance: "", price: 0 });
  };

  const onPriceCalculateHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPriceCalculate(e, +consumptionInput);
    onClickClear();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPriceFormState({
      ...priceFormInputsData,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      <button
        className="price-form-clear clear-btn "
        onClick={onClickClear}
        disabled={!isSomeFilled}
      >
        Clear form
      </button>
      <form className="price-form" onSubmit={onPriceCalculateHandler}>
        <h2>Enter your data</h2>
        <div className="input-block">
          <label htmlFor="distanceCalc">Distance in km:</label>
          <input
            id="distanceCalc"
            required
            type="number"
            name="distance"
            placeholder="Distance..."
            onChange={handleInput}
            value={distance ? distance.toString() : ""}
          />
        </div>
        <div className="input-block">
          <label htmlFor="consumptionCalc">Consumption in litres:</label>
          <input
            id="consumptionCalc"
            required
            type="number"
            name="fuel"
            placeholder="Consumption..."
            value={consumptionInput ? consumptionInput.toString() : ""}
            onChange={(e) => setConsumptionInput(+e.target.value)}
            step={0.1}
          />
        </div>
        <div className="input-block">
          <label htmlFor="priceCalc">Current price in UAH:</label>
          <input
            id="priceCalc"
            required
            name="price"
            type="number"
            placeholder="Price..."
            step={0.01}
            onChange={handleInput}
            value={price ? price.toString() : ""}
            min={0.01}
          />
        </div>
        <input type="submit" value="Calculate price" />
      </form>
    </>
  );
};

export default PriceForm;
