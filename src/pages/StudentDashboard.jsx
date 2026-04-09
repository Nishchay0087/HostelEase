import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, Utensils, Wifi, Megaphone, Wrench, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const { user, complaints, messMenu, notices } = useApp();

  const userComplaints = complaints.filter(c => c.studentId === user.id);
  const activeComplaints = userComplaints.filter(c => c.status !== 'resolved').length;

  return (
    <div className="pb-safe animate-fade-in relative w-full h-full">
      {/* Header */}
      <div className="glass-header px-4 py-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Welcome back,</p>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-xs text-primary-600 font-semibold bg-primary-50 px-2 py-0.5 rounded-full inline-block mt-1">Room {user.room}</p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg border-2 border-primary-200">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5">
        
        {/* Quick Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/track" className="card bg-gradient-to-br from-red-50 to-orange-50 border-orange-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm text-orange-500">
                <AlertCircle size={20} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{activeComplaints}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Active Issues</p>
          </Link>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-500">
                <Wifi size={20} />
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-sm font-semibold text-gray-700">WiFi Status</p>
            <p className="text-xs text-emerald-600 mt-1">Stable (120 Mbps)</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/report" className="card flex flex-col items-center justify-center py-6 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-3">
                <Wrench size={24} />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Issue Report</span>
            </Link>
            
            <Link to="/track" className="card flex flex-col items-center justify-center py-6 hover:border-primary-300 transition-colors">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-3">
                <AlertCircle size={24} />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Track Progress</span>
            </Link>
          </div>
        </div>

        {/* Mess Menu Context */}
        <div className="card border-blue-100 bg-gradient-to-r from-white to-blue-50/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <Utensils size={18} />
              <h3>Today's Mess Menu</h3>
            </div>
            <button className="text-xs text-blue-600 font-medium flex items-center">View all <ChevronRight size={14}/></button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1.5 h-auto bg-blue-400 rounded-full"></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Breakfast</p>
                <p className="text-sm text-gray-800 font-medium">{messMenu.breakfast}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-auto bg-orange-400 rounded-full"></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lunch</p>
                <p className="text-sm text-gray-800 font-medium">{messMenu.lunch}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-auto bg-indigo-400 rounded-full"></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dinner</p>
                <p className="text-sm text-gray-800 font-medium">{messMenu.dinner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div>
           <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Notice Board</h2>
            <Link to="/notifications" className="text-xs text-primary-600 font-medium flex items-center">See all</Link>
          </div>
          <div className="space-y-3">
            {notices.map(notice => (
              <div key={notice.id} className="card flex gap-3 items-start border-l-4 border-l-primary-500">
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600 mt-1">
                  <Megaphone size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{notice.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notice.content}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">{new Date(notice.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
