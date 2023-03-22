import React, { useEffect, useState } from "react";

interface IPriceForm {
  priceCalculateInput: number | string;
  setPriceCalculateInput: React.Dispatch<React.SetStateAction<number | string>>;
  onPriceCalculate: (
    e: React.ChangeEvent<HTMLFormElement>,
    manualInput: number
  ) => void;
  priceConsumption: string;
  lastConsumption: number | string;
  priceFormInput: number;
  setPriceFormInput: React.Dispatch<React.SetStateAction<number>>;
}

const PriceForm: React.FC<IPriceForm> = ({
  setPriceCalculateInput,
  onPriceCalculate,
  priceCalculateInput,
  lastConsumption,
  priceFormInput,
  setPriceFormInput,
}) => {
  const [consumptionInput, setConsumptionInput] = useState<number | string>(
    lastConsumption
  );

  useEffect(() => {
    if (lastConsumption) {
      setConsumptionInput(lastConsumption);
    }
  }, [lastConsumption]);

  const isSomeFilled: boolean =
    !!priceCalculateInput || !!priceFormInput || !!consumptionInput;

  const onClickClear = (): void => {
    setConsumptionInput("");
    setPriceFormInput(0);
    setPriceCalculateInput(0);
  };

  const onPriceCalculateClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPriceCalculate(e, +consumptionInput);
    onClickClear();
  };

  return (
    <>
      <button
        className="price-form-clear clear-btn "
        onClick={onClickClear}
        disabled={!isSomeFilled}
      >
        Clear form
      </button>
      <form className="price-form" onSubmit={onPriceCalculateClick}>
        <h2>How much does it cost?</h2>
        <div className="input-block">
          <label htmlFor="distanceCalc">Distance in km:</label>
          <input
            id="distanceCalc"
            required
            type="number"
            name="distanceCalc"
            placeholder="Distance..."
            onChange={(e) => setPriceCalculateInput(+e.target.value)}
            value={priceCalculateInput ? priceCalculateInput.toString() : ""}
          />
        </div>
        <div className="input-block">
          <label htmlFor="consumption">Consumption in litres:</label>
          <input
            id="consumption"
            required
            type="number"
            name="consumption"
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPriceFormInput(+e.target.value)
            }
            value={priceFormInput ? priceFormInput.toString() : ""}
            min={0.01}
          />
        </div>
        <input type="submit" value="Calculate price" />
      </form>
    </>
  );
};

export default PriceForm;
