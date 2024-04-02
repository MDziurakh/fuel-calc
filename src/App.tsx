import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import PriceCalcPage from "./pages/PriceCalcPage";
import Header from "./components/Header/Header";
import ReactGA from "react-ga4";

const gaTrackingId = "G-CRCE9WGQKQ";

ReactGA.initialize(gaTrackingId);

const App: React.FC = () => {
  const [consumption, setConsumption] = useState<IConsumption>({
    fuelConsumption: 0,
    priceResult: 0,
  });
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);
  const [appDataState, setAppDataState] = useState<Array<IAllDataItem>>([]);

  const [fuelFormState, setFuelFormState] = useState<IFuelFormState>({
    fuel: 0,
    price: 0,
    distance: 0,
  });

  const [priceFormState, setPiceFormState] = useState<IPriceFormState>({
    distance: "",
    price: 0,
  });
  const [priceConsumption, setPriceConsumption] = useState<string>("");

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("appDataState");
    if (typeof dataFromStorage === "string") {
      setAppDataState(JSON.parse(dataFromStorage));
    }
  }, []);

  useEffect(() => {
    if (appDataState.length) {
      localStorage.setItem("appDataState", JSON.stringify(appDataState));
    } else {
      localStorage.removeItem("appDataState");
      setConsumption({ fuelConsumption: 0, priceResult: 0 });
    }
  }, [appDataState]);

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      !fuelFormState.fuel ||
      !fuelFormState.distance ||
      !fuelFormState.price
    ) {
      return;
    }

    let litrage = ((fuelFormState.fuel / fuelFormState.distance) * 100).toFixed(
      2
    );
    let price = (
      (fuelFormState.fuel / fuelFormState.distance) *
      100 *
      fuelFormState.price *
      (fuelFormState.distance / 100)
    ).toFixed(2);
    let res: IConsumption = { fuelConsumption: +litrage, priceResult: +price };

    const newData: {
      fuel: number;
      distance: number;
      consumption: string;
      id: string;
    } = {
      fuel: fuelFormState.fuel,
      distance: fuelFormState.distance,
      consumption: ((fuelFormState.fuel / fuelFormState.distance) * 100)
        .toFixed(2)
        .toString(),
      id: crypto.randomUUID(),
    };

    ReactGA.event({
      action: "calculate consumption",
      category: "consumption",
    });

    setConsumption(res);
    setAppDataState([...appDataState, newData]);
    setFuelFormState({ fuel: 0, distance: 0, price: 0 });
  };

  const onClickCopy = (): void => {
    if (consumption.fuelConsumption !== 0) {
      ReactGA.event({
        action: "copy result",
        category: "consumption",
      });

      navigator.clipboard.writeText(
        `Consumption - ${consumption.fuelConsumption.toString()}L/100km, distance - ${
          appDataState[appDataState.length - 1].distance
        }km ,price - ${consumption.priceResult}UAH`
      );
      setShowCopyMessage(true);
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 1300);
    } else {
    }
  };

  const onRemoveCalculateItem = (id: string): void => {
    const filteredData = appDataState.filter((dataItem) => dataItem.id !== id);

    ReactGA.event({
      action: "Remove Calculate Item",
      category: "remove data",
    });

    if (!filteredData.length) {
      setAppDataState([]);
      return;
    }
    setAppDataState(filteredData);
  };

  const clearStorageData = (): void => {
    const clearData = window.confirm("Remove all data from storage?");

    if (clearData) {
      ReactGA.event({
        action: "Remove full data",
        category: "remove data",
      });

      localStorage.removeItem("appDataState");
      setAppDataState([]);
      setConsumption({ fuelConsumption: 0, priceResult: 0 });
    }
  };

  const onPriceCalculate = (
    e: React.ChangeEvent<HTMLFormElement>,
    manualConsumptionInput: number
  ): void => {
    e.preventDefault();

    if (manualConsumptionInput && priceFormState.distance) {
      ReactGA.event({
        action: "calculate price with custom consumption",
        category: "price",
      });

      setPriceConsumption(
        `It will be cost ${(
          manualConsumptionInput *
          0.01 *
          +priceFormState.distance *
          priceFormState.price
        ).toFixed(1)} UAH`
      );
    } else if (
      priceFormState.distance &&
      appDataState.length &&
      appDataState[appDataState.length - 1].consumption
    ) {
      ReactGA.event({
        action: "calculate price with last consumption",
        category: "price",
      });

      const lastConsumption =
        +appDataState[appDataState.length - 1].consumption;
      setPriceConsumption(
        `It will be cost ${(
          lastConsumption *
          0.01 *
          +priceFormState.distance *
          priceFormState.price
        ).toFixed(1)} UAH`
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="content-wrapper">
        <div className="content">
          <Routes>
            <Route
              path="fuel-calc/"
              element={
                <MainPage
                  clearStorageData={clearStorageData}
                  appDataState={appDataState}
                  onSubmitHandler={onSubmitHandler}
                  setFuelFormState={setFuelFormState}
                  fuelFormInputsData={fuelFormState}
                  consumption={consumption}
                  onClickCopy={onClickCopy}
                  showCopyMessage={showCopyMessage}
                />
              }
            />
            <Route
              path="fuel-calc/price"
              element={
                <PriceCalcPage
                  appDataState={appDataState}
                  onPriceCalculate={onPriceCalculate}
                  priceConsumption={priceConsumption}
                  priceFormState={priceFormState}
                  setPiceFormState={setPiceFormState}
                  priceFormInputsData={priceFormState}
                />
              }
            />
            <Route
              path="fuel-calc/history"
              element={
                <HistoryPage
                  clearStorageData={clearStorageData}
                  appDataState={appDataState}
                  onRemoveCalculateItem={onRemoveCalculateItem}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

export interface IFuelFormState {
  fuel: number;
  price: number;
  distance: number;
}

export interface IConsumption {
  priceResult: number;
  fuelConsumption: number;
}

export interface IAllDataItem {
  fuel: number;
  distance: number;
  consumption: string;
  id: string;
}

export interface IPriceFormState {
  distance: number | string;
  price: number;
}
