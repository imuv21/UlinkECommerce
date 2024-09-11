import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminDashboard />
            <div style={{ width: '85%' }}>
                <Outlet />
            </div>
        </div>
    )
};

export default AdminLayout;
