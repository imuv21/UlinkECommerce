import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protector = ({ children, isAuthenticated, role, requiredRole, redirect = "/" }) => {
  if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default Protector;
