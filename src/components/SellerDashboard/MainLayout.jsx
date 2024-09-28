import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%' }}>
      <SideNav />
      <div style={{ width: '80%' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
