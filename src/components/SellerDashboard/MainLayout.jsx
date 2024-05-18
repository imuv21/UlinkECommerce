import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav />
      <div style={{ width: '85%' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
