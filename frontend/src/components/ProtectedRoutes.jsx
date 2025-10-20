import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const { authenticated } = useSelector((state) => state.user);
    if (authenticated) {
        return <Outlet />;
    }
    else return <Navigate to='/404' replace/>; 
}

export default ProtectedRoutes;
