import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Bell, User, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function BottomNav() {
  const { user } = useApp();

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-2 py-3 bg-white">
        <NavLink to="/" className={({isActive}) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
          {({isActive}) => (
            <>
              <Home size={24} className={isActive ? 'fill-primary-100' : ''} />
              <span className="text-[10px] mt-1 font-medium">Home</span>
            </>
          )}
        </NavLink>
        
        {user?.role === 'student' && (
          <NavLink to="/track" className={({isActive}) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <ClipboardList size={24} />
            <span className="text-[10px] mt-1 font-medium">Complaints</span>
          </NavLink>
        )}

        {user?.role === 'warden' && (
          <NavLink to="/track" className={({isActive}) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <ClipboardList size={24} />
            <span className="text-[10px] mt-1 font-medium">Manage Tasks</span>
          </NavLink>
        )}

        {user?.role === 'student' && (
          <div className="relative -top-5">
            <NavLink to="/report" className="flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-105 transition-all">
              <PlusCircle size={30} />
            </NavLink>
          </div>
        )}

        <NavLink to="/notifications" className={({isActive}) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
          <Bell size={24} />
          <span className="text-[10px] mt-1 font-medium">Alerts</span>
        </NavLink>

        <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
          <User size={24} />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNav;
