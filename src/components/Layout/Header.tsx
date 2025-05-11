import React from 'react';
import { 
  Shield, Menu, Bell, LogOut, User, ChevronDown, 
  Lock, MapPin, LayoutDashboard 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLocation } from '../../context/LocationContext';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  notificationsOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  toggleNotifications, 
  notificationsOpen 
}) => {
  const { currentUser, logout } = useUser();
  const { notifications } = useLocation();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-cyber-dark border-b border-neon-green/30 text-white z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="mr-4 p-1 rounded-md hover:bg-cyber-gray focus:outline-none"
            >
              <Menu size={24} className="text-neon-green" />
            </button>
            
            <div className="flex items-center">
              <Shield size={24} className="text-neon-green mr-2" />
              <span className="font-terminal text-xl text-neon-green tracking-widest">
                FAMILY<span className="text-white opacity-80">SECURE</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className={`p-2 rounded-full hover:bg-cyber-gray focus:outline-none ${notificationsOpen ? 'bg-cyber-gray' : ''}`}
              >
                <Bell size={20} className={unreadCount > 0 ? 'text-alert-orange' : 'text-neon-green'} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-alert-red text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-cyber-gray focus:outline-none">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-green/50">
                  <img 
                    src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:inline text-sm font-mono">{currentUser?.name || 'Admin'}</span>
                <ChevronDown size={16} className="text-neon-green" />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-cyber-gray border border-neon-green/40 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-neon-green/20">
                  <p className="text-sm font-semibold text-neon-green">{currentUser?.name}</p>
                  <p className="text-xs text-gray-400">{currentUser?.role}</p>
                </div>
                
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light hover:text-neon-green">
                  <User size={16} className="mr-2" />
                  Profile
                </a>
                
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light hover:text-neon-green">
                  <Lock size={16} className="mr-2" />
                  Security
                </a>
                
                <button 
                  onClick={logout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-cyber-light hover:text-alert-red"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;