import React from 'react';
import { Bell, X, CheckCheck, UserCheck, MapPin, AlertTriangle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useUser } from '../../context/UserContext';
import { format, formatDistanceToNow } from 'date-fns';

interface NotificationsPanelProps {
  open: boolean;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ open }) => {
  const { notifications, clearNotification, markAllNotificationsAsRead } = useLocation();
  const { users } = useUser();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <UserCheck size={18} className="text-neon-blue" />;
      case 'warning':
        return <MapPin size={18} className="text-alert-orange" />;
      case 'alert':
        return <AlertTriangle size={18} className="text-alert-red" />;
      default:
        return <Bell size={18} className="text-neon-green" />;
    }
  };

  const getUserName = (userId?: string) => {
    if (!userId) return 'Unknown';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-10 w-80 bg-cyber-dark border-l border-neon-green/30 transition-transform duration-300 transform ${
        open ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell size={20} className="text-neon-green mr-2" />
            <h2 className="text-neon-green font-mono text-lg">Notifications</h2>
          </div>
          
          {notifications.length > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-gray-400 hover:text-neon-green flex items-center"
            >
              <CheckCheck size={14} className="mr-1" />
              Mark all read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="cyber-panel p-4 flex flex-col items-center justify-center text-center">
              <Bell size={24} className="text-gray-500 mb-2" />
              <p className="text-gray-400 text-sm">No notifications yet</p>
              <p className="text-gray-500 text-xs mt-1">Alerts will appear here</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`cyber-panel p-3 relative ${notification.read ? 'opacity-80' : ''}`}
              >
                {!notification.read && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full"></span>
                )}
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-white truncate">
                        {getUserName(notification.userId)}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(notification.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => clearNotification(notification.id)}
                    className="ml-2 text-gray-400 hover:text-neon-green"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default NotificationsPanel;