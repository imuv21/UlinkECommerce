import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminProtector = ({ children, isAuthenticated, role, requiredRoles = [] }) => {

    if (!isAuthenticated) {
        return <div>You need to be authenticated to access this page.</div>;
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
        return <div>You do not have permission to access this page.</div>;
    }

    return children ? children : <Outlet />;
};

export default AdminProtector;







