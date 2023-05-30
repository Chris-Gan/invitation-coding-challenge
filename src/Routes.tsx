import MainPage from 'views/MainPage/MainPage';
import React from 'react';
import { Routes as RoutesWrapper, Route } from 'react-router-dom';

const Routes = () => {
    return (
        <RoutesWrapper>
            <Route index element={<MainPage />} />
        </RoutesWrapper>
    );
};

export default Routes;
