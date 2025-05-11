import React, { useState } from 'react';
import { Settings as SettingsIcon, Lock, Server, Database, Clock, Shield, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Settings: React.FC = () => {
  const { currentUser, logout } = useUser();
  const [activeTab, setActiveTab] = useState('security');
  
  const isAdmin = currentUser?.role === 'admin';
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Lock size={48} className="text-alert-red mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">Access Restricted</h2>
          <p className="text-gray-400">Only administrators can access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-mono text-neon-green flex items-center">
          <SettingsIcon className="inline-block mr-2" size={24} />
          System Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Configure your secure tracking system
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="cyber-panel p-4 lg:col-span-1">
          <h3 className="text-neon-green text-sm uppercase tracking-wider mb-4">Settings Menu</h3>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'security' 
                  ? 'bg-cyber-gray text-neon-green' 
                  : 'text-gray-300 hover:bg-cyber-gray/50 hover:text-white'
              }`}
            >
              <Shield size={16} className="mr-2" />
              Security & Privacy
            </button>
            
            <button
              onClick={() => setActiveTab('server')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'server' 
                  ? 'bg-cyber-gray text-neon-green' 
                  : 'text-gray-300 hover:bg-cyber-gray/50 hover:text-white'
              }`}
            >
              <Server size={16} className="mr-2" />
              Server Configuration
            </button>
            
            <button
              onClick={() => setActiveTab('database')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'database' 
                  ? 'bg-cyber-gray text-neon-green' 
                  : 'text-gray-300 hover:bg-cyber-gray/50 hover:text-white'
              }`}
            >
              <Database size={16} className="mr-2" />
              Database Management
            </button>
            
            <button
              onClick={() => setActiveTab('tracking')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'tracking' 
                  ? 'bg-cyber-gray text-neon-green' 
                  : 'text-gray-300 hover:bg-cyber-gray/50 hover:text-white'
              }`}
            >
              <Clock size={16} className="mr-2" />
              Tracking Settings
            </button>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-cyber-light">
            <button
              onClick={logout}
              className="w-full bg-cyber-gray/30 hover:bg-alert-red/20 text-alert-red border border-alert-red/30 rounded-md py-2 flex items-center justify-center"
            >
              <LogOut size={16} className="mr-2" />
              Secure Logout
            </button>
          </div>
        </div>
        
        <div className="cyber-panel p-6 lg:col-span-3">
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl text-neon-green mb-6">Security & Privacy Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-md mb-3">Authentication</h3>
                  <div className="cyber-panel p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-400">Enforce 2FA for all admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">Session Timeout</h4>
                        <p className="text-sm text-gray-400">Auto-logout after inactivity</p>
                      </div>
                      <select className="terminal-input bg-cyber-gray/80 text-sm">
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white text-md mb-3">Data Privacy</h3>
                  <div className="cyber-panel p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white">End-to-End Encryption</h4>
                        <p className="text-sm text-gray-400">All location data is encrypted</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white">Data Retention</h4>
                        <p className="text-sm text-gray-400">How long to keep location history</p>
                      </div>
                      <select className="terminal-input bg-cyber-gray/80 text-sm">
                        <option value="7">7 days</option>
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="365">1 year</option>
                        <option value="0">Forever</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">External API Access</h4>
                        <p className="text-sm text-gray-400">Allow external systems to access data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="cyber-button">
                    Save Security Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'server' && (
            <div>
              <h2 className="text-xl text-neon-green mb-6">Server Configuration</h2>
              
              <div className="space-y-6">
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">System Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Server IP</p>
                      <p className="text-white font-mono">192.168.1.100</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Server Type</p>
                      <p className="text-white font-mono">Home Server (Raspberry Pi 4)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Operating System</p>
                      <p className="text-white font-mono">Ubuntu Server 22.04 LTS</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">NodeJS Version</p>
                      <p className="text-white font-mono">v20.12.0</p>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">Network Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Server Port</label>
                      <input type="number" className="terminal-input w-full" defaultValue="3000" />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">External Access URL</label>
                      <input type="text" className="terminal-input w-full" placeholder="https://example.com" />
                      <p className="text-xs text-gray-500 mt-1">Leave blank to disable external access</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">HTTPS Encryption</h4>
                        <p className="text-sm text-gray-400">Use SSL for secure connections</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-cyber-gray">
                    Restart Server
                  </button>
                  <button className="cyber-button">
                    Save Server Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'database' && (
            <div>
              <h2 className="text-xl text-neon-green mb-6">Database Management</h2>
              
              <div className="space-y-6">
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">Database Status</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Database Type</p>
                      <p className="text-white font-mono">SQLite (local)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Size</p>
                      <p className="text-white font-mono">124.5 MB</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location Records</p>
                      <p className="text-white font-mono">14,526</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Last Backup</p>
                      <p className="text-white font-mono">2025-03-15 08:30:12</p>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">Backup & Maintenance</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Backup Location</label>
                      <input type="text" className="terminal-input w-full" defaultValue="/home/pi/backups" />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Backup Schedule</label>
                      <select className="terminal-input w-full">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">Auto-Cleanup Old Records</h4>
                        <p className="text-sm text-gray-400">Delete data older than retention period</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-alert-red text-alert-red rounded hover:bg-alert-red/10">
                    Delete All Data
                  </button>
                  <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-cyber-gray">
                    Backup Now
                  </button>
                  <button className="cyber-button">
                    Save Database Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tracking' && (
            <div>
              <h2 className="text-xl text-neon-green mb-6">Tracking Settings</h2>
              
              <div className="space-y-6">
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">Location Tracking</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Update Frequency</label>
                      <select className="terminal-input w-full">
                        <option value="30">Every 30 seconds</option>
                        <option value="60">Every minute</option>
                        <option value="300">Every 5 minutes</option>
                        <option value="600">Every 10 minutes</option>
                        <option value="1800">Every 30 minutes</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">More frequent updates use more battery power</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Minimum Distance (meters)</label>
                      <input type="number" className="terminal-input w-full" defaultValue="10" />
                      <p className="text-xs text-gray-500 mt-1">Minimum movement before logging a new location</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">High Accuracy Mode</h4>
                        <p className="text-sm text-gray-400">Use GPS + WiFi + Cell towers (higher battery usage)</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-panel p-4">
                  <h3 className="text-white text-md mb-3">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white">Geo-fence Notifications</h4>
                        <p className="text-sm text-gray-400">Notify when users enter/exit boundaries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white">Battery Warnings</h4>
                        <p className="text-sm text-gray-400">Alert when device battery is low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white">Offline Alerts</h4>
                        <p className="text-sm text-gray-400">Notify when a device goes offline</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="cyber-button">
                    Save Tracking Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-8 text-xs text-gray-500">
        Created by <a href="https://github.com/odaysec" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">@odaysec</a>
      </div>
    </div>
  );
};

export default Settings;