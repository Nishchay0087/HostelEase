import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Send, Users, Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function WardenDashboard() {
  const { user, complaints, notices, addNotice } = useApp();
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Status counters
  const urgent = complaints.filter(c => c.urgency === 'high' && c.status !== 'resolved').length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;

  const handleBroadcast = (e) => {
    e.preventDefault();
    if(!broadcastMsg.trim()) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      addNotice('Warden Announcement', broadcastMsg);
      setBroadcastMsg('');
      setIsBroadcasting(false);
    }, 600);
  };

  return (
    <div className="pb-safe animate-fade-in relative w-full h-full">
      <div className="glass-header px-4 py-4 rounded-b-3xl bg-indigo-600 border-b-0">
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-sm text-indigo-100 font-medium">Warden Portal</p>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-xs text-indigo-200 font-medium mt-1">Wing {user.wing} Incharge</p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/30">
            <Shield size={24} className="text-white" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5">
        
        {/* Hostel Overview */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Activity size={20} className="text-primary-600" />
            Hostel Overview
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="card border-t-4 border-t-red-500 bg-red-50 flex flex-col items-center justify-center py-4">
              <AlertTriangle size={24} className="text-red-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900">{urgent}</span>
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Urgent</span>
            </div>
            
            <div className="card border-t-4 border-t-yellow-500 bg-yellow-50 flex flex-col items-center justify-center py-4">
              <Clock size={24} className="text-yellow-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900">{pending}</span>
              <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider">Pending</span>
            </div>
            
            <div className="card border-t-4 border-t-emerald-500 bg-emerald-50 flex flex-col items-center justify-center py-4">
              <CheckCircle size={24} className="text-emerald-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900">{resolved}</span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Resolved</span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <Link to="/track" className="card bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between p-5 hover:shadow-lg transition-all active:scale-95 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Manage Tasks</h3>
              <p className="text-xs text-gray-300 mt-1">Assign and track staff</p>
            </div>
          </div>
        </Link>

        {/* Broadcast Tool */}
        <div className="card border-indigo-100 bg-gradient-to-br from-white to-indigo-50">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Send size={18} className="text-indigo-600" />
            Broadcast Announcement
          </h3>
          <form onSubmit={handleBroadcast}>
            <textarea
              className="input-field w-full text-sm resize-none mb-3"
              rows={3}
              placeholder="Type message to send to all students..."
              value={broadcastMsg}
              onChange={(e) => setBroadcastMsg(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!broadcastMsg.trim() || isBroadcasting}
              className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              {isBroadcasting ? 'Sending...' : 'Send Broadcast'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default WardenDashboard;
