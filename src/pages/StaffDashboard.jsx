import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wrench, CheckCircle2, Navigation2, Check, Clock } from 'lucide-react';

function StaffDashboard() {
  const { user, complaints, updateComplaintStatus } = useApp();
  const [activeTab, setActiveTab] = useState('assigned');

  // Staff (Technician) views assigned tasks
  const myTasks = complaints.filter(c => c.assignedTo === user.id);
  
  const assignedTasks = myTasks.filter(c => c.status === 'assigned');
  const inProgressTasks = myTasks.filter(c => c.status === 'in-progress');
  const completedTasks = myTasks.filter(c => c.status === 'resolved');

  const getActiveList = () => {
    switch(activeTab) {
      case 'assigned': return assignedTasks;
      case 'in-progress': return inProgressTasks;
      case 'completed': return completedTasks;
      default: return [];
    }
  };

  const currentList = getActiveList();

  const handleUpdateStatus = (id, newStatus) => {
    updateComplaintStatus(id, newStatus);
  };

  return (
    <div className="pb-safe animate-fade-in relative w-full h-screen flex flex-col">
      <div className="glass-header px-4 py-4 backdrop-blur-xl bg-orange-600 border-b-0">
        <div className="flex items-center justify-between text-white">
          <div>
             <p className="text-sm text-orange-200 font-medium tracking-wide uppercase">Technician</p>
             <h1 className="text-2xl font-bold">{user.name}</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/30">
            <Wrench size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white flex p-2 border-b border-gray-200 shadow-sm z-10 sticky top-[88px]">
        {['assigned', 'in-progress', 'completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-bold capitalize rounded-xl transition-all ${
              activeTab === tab 
                ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab}
            {tab === 'assigned' && assignedTasks.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-[10px] py-0.5 px-2 rounded-full">{assignedTasks.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {currentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
            <CheckCircle2 size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No {activeTab} tasks</p>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {currentList.map(task => (
              <div key={task.id} className="card border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{task.category}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    task.urgency === 'high' ? 'bg-red-50 text-red-600 uppercase' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {task.urgency === 'high' ? 'Urgent' : 'Normal'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">{task.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Scheduled ETA</p>
                    <p className="text-sm font-bold text-gray-800">{task.eta || 'ASAP'}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  {task.status === 'assigned' && (
                    <button 
                      onClick={() => handleUpdateStatus(task.id, 'in-progress')}
                      className="w-full btn-primary bg-orange-500 hover:bg-orange-600 flex justify-center items-center gap-2"
                    >
                      <Navigation2 size={18} /> Accept & Start
                    </button>
                  )}
                  {task.status === 'in-progress' && (
                    <button 
                      onClick={() => handleUpdateStatus(task.id, 'resolved')}
                      className="w-full btn-primary bg-emerald-500 hover:bg-emerald-600 flex justify-center items-center gap-2"
                    >
                      <Check size={18} /> Mark Complete
                    </button>
                  )}
                  {task.status === 'resolved' && (
                    <div className="w-full py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl flex justify-center items-center gap-2 border border-emerald-100">
                      <CheckCircle2 size={18} /> Task Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default StaffDashboard;
