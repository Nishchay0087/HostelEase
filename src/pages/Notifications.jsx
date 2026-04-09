import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, Megaphone, BellOff } from 'lucide-react';

function Notifications() {
  const { notifications, markNotificationsRead } = useApp();

  useEffect(() => {
    // Mark as read when unmounting
    return () => {
      markNotificationsRead();
    };
  }, []);

  return (
    <div className="pb-safe animate-fade-in relative w-full h-full min-h-screen">
      <div className="glass-header px-4 py-4 backdrop-blur-xl bg-white/90 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={24} className="text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>
        {notifications.filter(n => !n.read).length > 0 && (
          <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
            {notifications.filter(n => !n.read).length} New
          </span>
        )}
      </div>

      <div className="p-4 space-y-3 pb-24">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <BellOff size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No alerts right now</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`card flex gap-3 items-start border-l-4 transition-all hover:bg-gray-50 ${
                notif.read ? 'border-l-gray-300 opacity-70' : 'border-l-primary-500 shadow-md transform scale-[1.01]'
              }`}
            >
              <div className={`p-2 rounded-lg mt-1 ${notif.read ? 'bg-gray-100 text-gray-500' : 'bg-primary-50 text-primary-600'}`}>
                {notif.message.includes('New') ? <Megaphone size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <div>
                <p className={`text-sm ${notif.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                  {notif.message}
                </p>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  {new Date(notif.time).toLocaleString([], {hour: '2-digit', minute:'2-digit', day:'numeric', month:'short'})}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
