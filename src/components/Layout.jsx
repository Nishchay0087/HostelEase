import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useApp } from '../context/AppContext';

function Layout() {
  const { user } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <main className="flex-1 max-w-lg w-full mx-auto relative md:border-x md:border-gray-200 bg-gray-50 shadow-sm min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;
