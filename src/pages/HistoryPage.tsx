import React from 'react';
import CalculationsList from '../components/CalculationsList/CalculationsList';

interface IHistoryPage {
    allData: Array<{ fuel: number; distance: number; consumption: string }>
}

const HistoryPage:React.FC<IHistoryPage> = ({allData}) => {
    return (
        <div className='history-page-wrapper wrapper'>
            <h1>Your calculations list</h1> 
           <CalculationsList allData={allData} /> 
        </div>
    );
};

export default HistoryPage;