import React from 'react';
import CalculationsList from '../components/CalculationsList/CalculationsList';

import './HistoryPage.scss'

interface IHistoryPage {
    clearStorageData:()=>void;
    onRemoveCalculateItem:(id:string)=>void
    allData: Array<{ fuel: number; distance: number; consumption: string, id:string }>
}

const HistoryPage:React.FC<IHistoryPage> = ({allData, onRemoveCalculateItem, clearStorageData}) => {


    return (
        <div className='history-page-wrapper wrapper'>
            <h1>Your calculations list{!allData.length && ' is empty!'}</h1> 
           <CalculationsList allData={allData} onRemoveCalculateItem={onRemoveCalculateItem} clearStorageData={clearStorageData} /> 
        </div>
    );
};

export default HistoryPage;