import React from 'react';
import { useApp } from '../context/AppContext';
import { User, LogOut, Mail, ShieldCheck, HelpCircle, ChevronRight, Moon, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout, isDarkMode, toggleTheme } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pb-safe animate-fade-in relative w-full h-full min-h-screen bg-gray-50">
      
      <div className="bg-primary-600 px-4 py-8 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center font-bold text-4xl text-primary-600 shadow-xl border-4 border-primary-400 mb-4">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-primary-100 font-medium capitalize mt-1">
            {user.role} {user.room ? `• Room ${user.room}` : ''} {user.wing ? `• Wing ${user.wing}` : ''}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4 pb-24">
        
        {/* Account Info */}
        <div className="card space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-semibold mb-0.5">Email Address</p>
              <p className="text-sm font-bold text-gray-900">{user.email}</p>
            </div>
          </div>
          
          <div className="w-full h-[1px] bg-gray-100"></div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-semibold mb-0.5">Account Status</p>
              <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">Verified <CheckCircle2 size={14} className="text-emerald-500"/></p>
            </div>
          </div>
        </div>

        {/* Settings Links */}
        <div className="card px-0 py-2">
          
          <button onClick={toggleTheme} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors dark:hover:bg-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg dark:bg-indigo-900/50 dark:text-indigo-400"><Moon size={18} /></div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Dark Mode</span>
            </div>
            <div className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${isDarkMode ? 'bg-primary-600' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </button>
          
          <div className="w-full h-[1px] bg-gray-100 ml-12 border-none"></div>

          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><HelpCircle size={18} /></div>
              <span className="text-sm font-medium text-gray-800">Help & Support</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full card border-red-100 bg-red-50 text-red-600 py-4 font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors active:scale-95"
        >
          <LogOut size={20} /> Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;
