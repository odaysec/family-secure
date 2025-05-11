import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Map, Settings, 
  BarChart2, Shield, Clock, Bell, PieChart 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const { currentUser } = useUser();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-cyber-dark border-r border-neon-green/30 transition-transform duration-300 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 ${open ? 'md:block' : 'md:hidden'} overflow-y-auto`}
    >
      <div className="py-4">
        <div className="px-4 py-2 mb-6">
          <div className="flex items-center justify-center my-4">
            <Shield className="h-8 w-8 text-neon-green" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent mb-4"></div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">System Status</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="cyber-panel p-2 text-xs">
              <div className="text-gray-400">Uptime</div>
              <div className="text-neon-green font-mono mt-1 flex items-center">
                <Clock size={14} className="mr-1" /> 3d 12h 18m
              </div>
            </div>
            <div className="cyber-panel p-2 text-xs">
              <div className="text-gray-400">GPS Signals</div>
              <div className="text-neon-green font-mono mt-1 flex items-center">
                <span className="w-2 h-2 bg-neon-green rounded-full mr-1 animate-pulse"></span> 4/4 Active
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent mb-4"></div>

        <nav className="space-y-1 px-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive 
                  ? 'bg-cyber-gray text-neon-green border-l-2 border-neon-green' 
                  : 'text-gray-300 hover:text-neon-green hover:bg-cyber-gray/50'
              }`
            }
          >
            <LayoutDashboard size={18} className="mr-3" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/users" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive 
                  ? 'bg-cyber-gray text-neon-green border-l-2 border-neon-green' 
                  : 'text-gray-300 hover:text-neon-green hover:bg-cyber-gray/50'
              }`
            }
          >
            <Users size={18} className="mr-3" />
            <span>Family Members</span>
          </NavLink>

          <NavLink 
            to="/geofencing" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive 
                  ? 'bg-cyber-gray text-neon-green border-l-2 border-neon-green' 
                  : 'text-gray-300 hover:text-neon-green hover:bg-cyber-gray/50'
              }`
            }
          >
            <Map size={18} className="mr-3" />
            <span>Geo-Fencing</span>
          </NavLink>

          <NavLink 
            to="/statistics" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive 
                  ? 'bg-cyber-gray text-neon-green border-l-2 border-neon-green' 
                  : 'text-gray-300 hover:text-neon-green hover:bg-cyber-gray/50'
              }`
            }
          >
            <BarChart2 size={18} className="mr-3" />
            <span>Statistics</span>
          </NavLink>

          {isAdmin && (
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive 
                    ? 'bg-cyber-gray text-neon-green border-l-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:bg-cyber-gray/50'
                }`
              }
            >
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </NavLink>
          )}
        </nav>

        <div className="h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent my-4"></div>

        <div className="px-4">
          <div className="cyber-panel p-3">
            <h4 className="text-neon-green text-xs uppercase tracking-wider mb-2">System Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-neon-green">18%</span>
              </div>
              <div className="w-full bg-cyber-black rounded-full h-1.5">
                <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Memory</span>
                <span className="text-neon-green">32%</span>
              </div>
              <div className="w-full bg-cyber-black rounded-full h-1.5">
                <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Storage</span>
                <span className="text-neon-green">64%</span>
              </div>
              <div className="w-full bg-cyber-black rounded-full h-1.5">
                <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 text-xs text-gray-500">
            Created by <a href="https://github.com/odaysec" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">@odaysec</a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;