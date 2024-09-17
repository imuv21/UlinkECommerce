import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protector = ({ children, isAuthenticated, role, requiredRoles = [], redirect = "/" }) => {
  if (!isAuthenticated || (requiredRoles.length && !requiredRoles.includes(role))) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default Protector;







