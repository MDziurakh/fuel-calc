import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import PriceCalcPage from "./pages/PriceCalcPage";
import Header from "./components/Header/Header";


const App: React.FC = () => {
  // const [consumption, setConsumption] = useState<string>("");
  const [consumption, setConsumption] = useState<IConsumption>({
    fuelConsumption: 0,
    priceResult: 0,
  });
  const [copyMessage, setCopyMessage] = useState<boolean>(false);
  const [allData, setAllData] = useState<
    Array<{ fuel: number; distance: number; consumption: string }>
  >([]);
  const [newState, setNewState] = useState<INewState>({
    fuel: 0,
    price: 0,
    distance: 0,
  });

  const [priceCalculateInput, setPriceCalculateInput] = useState<
    number | string
  >("");
  const [priceConsumption, setPriceConsumption] = useState<string>("");

  const [priceFormInput, setPriceFormInput] = useState<number>(0);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("allData");

    if (typeof dataFromStorage === "string") {
      setAllData(JSON.parse(dataFromStorage));
    }
  }, []);

  useEffect(() => {
    if (allData.length) {
      localStorage.setItem("allData", JSON.stringify(allData));
    }
  }, [allData]);

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newState.fuel || !newState.distance || !newState.price) {
      return;
    }
    let litrage = ((newState.fuel / newState.distance) * 100).toFixed(2);
    let price = (
      (newState.fuel / newState.distance) *
      100 *
      newState.price *
      (newState.distance / 100)
    ).toFixed(2);
    let res: IConsumption = { fuelConsumption: +litrage, priceResult: +price };

    const newData = {
      fuel: newState.fuel,
      distance: newState.distance,
      consumption: ((newState.fuel / newState.distance) * 100)
        .toFixed(2)
        .toString(),
    };

    setConsumption(res);
    setAllData([...allData, newData]);
    setNewState({ fuel: 0, distance: 0, price: 0 });
  };

  const onClickCopy = (): void => {
    if (consumption.fuelConsumption !== 0) {
      navigator.clipboard.writeText(
        `fuel consumption is ${consumption.fuelConsumption.toString()}`
      );
      setCopyMessage(true);
      setTimeout(() => {
        setCopyMessage(false);
      }, 1300);
    } else {
    }
  };

  const clearStorageData = (): void => {
    const clearData = window.confirm("Remove all data from storage?");
    if (clearData) {
      localStorage.removeItem("allData");
      setAllData([]);
      setConsumption({ fuelConsumption: 0, priceResult: 0 });
    }
  };

  const onPriceCalculate = (
    e: React.ChangeEvent<HTMLFormElement>,
    manualConsumptionInput: number
  ): void => {
    e.preventDefault();

    if (manualConsumptionInput && priceCalculateInput) {
      setPriceConsumption(
        `It will be cost ${(
          manualConsumptionInput *
          0.01 *
          +priceCalculateInput *
          priceFormInput
        ).toFixed(1)} UAH`
      );
    } else if (
      priceCalculateInput &&
      allData.length &&
      allData[allData.length - 1].consumption
    ) {
      const latsConsumption = +allData[allData.length - 1].consumption;
      setPriceConsumption(
        `It will be cost ${(
          latsConsumption *
          0.01 *
          +priceCalculateInput *
          priceFormInput
        ).toFixed(1)} UAH`
      );
    }
  };

  const isDisabled = (e: React.MouseEvent<HTMLElement>): void => {
    !allData.length && e.preventDefault();
  };

  return (
    <div className="app">
      <Header allData={allData} isDisabled={isDisabled}/>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                clearStorageData={clearStorageData}
                allData={allData}
                onSubmitHandler={onSubmitHandler}
                setNewState={setNewState}
                inputsData={newState}
                consumption={consumption}
                onClickCopy={onClickCopy}
                copyMessage={copyMessage}
              />
            }
          />
          <Route
            path="/price-calc"
            element={
              <PriceCalcPage
                allData={allData}
                onPriceCalculate={onPriceCalculate}
                priceCalculateInput={priceCalculateInput}
                priceConsumption={priceConsumption}
                priceFormInput={priceFormInput}
                setPriceFormInput={setPriceFormInput}
                setPriceCalculateInput={setPriceCalculateInput}
              />
            }
          />
          <Route path="/history" element={<HistoryPage allData={allData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

export interface INewState {
  fuel: number;
  price: number;
  distance: number;
}

export interface IConsumption {
  priceResult: number;
  fuelConsumption: number;
}
