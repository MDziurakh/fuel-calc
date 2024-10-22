import React from "react";
import { IAllDataItem } from "../App";
import CalculationsList from "../components/CalculationsList/CalculationsList";
import "./HistoryPage.scss";

interface IHistoryPage {
  clearStorageData: () => void;
  onRemoveCalculateItem: (id: string) => void;
  appDataState: Array<IAllDataItem>;
}

const HistoryPage: React.FC<IHistoryPage> = ({
  appDataState,
  onRemoveCalculateItem,
  clearStorageData,
}) => (
  <div className="history-page-wrapper wrapper">
    <h1>Your calculations list{!appDataState.length && " is empty!"}</h1>
    <CalculationsList
      appDataState={appDataState}
      onRemoveCalculateItem={onRemoveCalculateItem}
      clearStorageData={clearStorageData}
    />
  </div>
);

export default HistoryPage;
