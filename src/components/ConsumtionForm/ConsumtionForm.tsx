import React, { Dispatch } from "react";
import { INewState } from "../../App";
// стилізувати 
interface IConsumption {
  inputsData: INewState;
  setNewState: Dispatch<React.SetStateAction<INewState>>;
  onSubmitHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const ConsumtionForm: React.FC<IConsumption> = (props: IConsumption) => {
  const { inputsData, onSubmitHandler, setNewState} = props;

  const { fuel, distance, price } = inputsData;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewState({ ...inputsData, [e.target.name]: e.target.value });
  };

  return (
   
      <form className="main-form" onSubmit={onSubmitHandler}>
        <h2>Enter your data</h2>
        <div className="input-block">
          <label htmlFor="fuel-input">Fuel in litres:</label>
          <input
            name="fuel"
            id="fuel-input"
            required
            type="number"
            placeholder="Fuel..."
            step={0.01}
            onChange={handleInput}
            value={fuel ? fuel.toString() : ""}
            min={0.01}
          />
        </div>
        <div className="input-block">
          <label htmlFor="distance-input">Distance in km:</label>
          <input
            name="distance"
            id="distance-input"
            required
            type="number"
            placeholder="Distance..."
            step={1}
            onChange={handleInput}
            value={distance ? distance.toString() : ""}
            min={1}
          />
        </div>
        <div className="input-block">
          <label htmlFor="price-input">Current price in UAH:</label>
          <input
            required
            name="price"
            id="price-input"
            type="number"
            placeholder="Price..."
            step={0.01}
            onChange={handleInput}
            value={price ? price.toString() : ""}
            min={0.01}
          />
        </div>
        <input type="submit" value="Calculate consumption" />
      </form>

  );
};

export default ConsumtionForm;
