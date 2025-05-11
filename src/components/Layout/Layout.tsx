import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationsPanel from '../Notifications/NotificationsPanel';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (notificationsOpen) {
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cyber-black">
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleNotifications={toggleNotifications}
        notificationsOpen={notificationsOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen && !notificationsOpen} />
        
        <main className={`flex-1 overflow-auto transition-all duration-200 p-4 ${sidebarOpen && !notificationsOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
        
        <NotificationsPanel open={notificationsOpen} />
      </div>
    </div>
  );
};

export default Layout;