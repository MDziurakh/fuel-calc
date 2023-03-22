import React from 'react';
import { Route, Routes } from 'react-router';
import PriceForm from '../components/PriceForm/PriceForm';

const MenuRoutes = () => {
    return (
        <Routes>
            {/* <Route path='/' element={<PriceForm/>}/> */}
            <Route path='/price-calc'/>
        </Routes>
    );
};

export default MenuRoutes;