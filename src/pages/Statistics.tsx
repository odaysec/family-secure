import React from 'react';
import { BarChart2, Calendar, Clock, Battery, MapPin, User, ArrowUp, ArrowDown } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useUser } from '../context/UserContext';
import { format, subDays } from 'date-fns';

const Statistics: React.FC = () => {
  const { locationHistory } = useLocation();
  const { users } = useUser();
  
  // Generate mock data for statistics
  const generateMockStats = () => {
    const mockStats = users.map(user => {
      // Generate distance traveled data for the last 7 days
      const distanceTraveled = Array.from({ length: 7 }, (_, i) => ({
        date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
        value: Math.floor(Math.random() * 15) + 1 // 1-15 km
      }));
      
      // Generate time at locations
      const timeAtLocations = [
        { locationName: 'Home', minutes: Math.floor(Math.random() * 600) + 600 },
        { locationName: 'Work/School', minutes: Math.floor(Math.random() * 480) + 240 },
        { locationName: 'Other', minutes: Math.floor(Math.random() * 240) + 60 }
      ];
      
      // Generate battery level history
      const batteryHistory = Array.from({ length: 24 }, (_, i) => ({
        date: format(subDays(new Date(), Math.floor(i / 8)), `HH:mm`),
        value: Math.max(10, 100 - (i * 3 + Math.floor(Math.random() * 10))) // Battery decreases over time
      }));
      
      return {
        userId: user.id,
        distanceTraveled,
        timeAtLocations,
        batteryHistory
      };
    });
    
    return mockStats;
  };
  
  const userStats = generateMockStats();
  
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };
  
  const getTotalDistance = (userId: string) => {
    const userStat = userStats.find(stat => stat.userId === userId);
    if (!userStat) return 0;
    
    return userStat.distanceTraveled.reduce((sum, day) => sum + day.value, 0);
  };
  
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const getLatestBatteryLevel = (userId: string) => {
    const userStat = userStats.find(stat => stat.userId === userId);
    if (!userStat || userStat.batteryHistory.length === 0) return 'N/A';
    
    return `${userStat.batteryHistory[0].value}%`;
  };
  
  // Calculate the previous day's distance for comparison
  const getPreviousDayDistance = (userId: string) => {
    const userStat = userStats.find(stat => stat.userId === userId);
    if (!userStat || userStat.distanceTraveled.length < 2) return 0;
    
    return userStat.distanceTraveled[1].value;
  };
  
  const getDistanceChange = (userId: string) => {
    const userStat = userStats.find(stat => stat.userId === userId);
    if (!userStat || userStat.distanceTraveled.length < 2) return { change: 0, increased: true };
    
    const today = userStat.distanceTraveled[0].value;
    const yesterday = userStat.distanceTraveled[1].value;
    const change = ((today - yesterday) / yesterday) * 100;
    
    return {
      change: Math.abs(Math.round(change)),
      increased: today > yesterday
    };
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-mono text-neon-green flex items-center">
          <BarChart2 className="inline-block mr-2" size={24} />
          Statistics
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Movement patterns and location analytics
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <Calendar size={14} className="mr-1" /> Date Range
          </h3>
          <div className="text-xl font-mono text-white">Last 7 Days</div>
          <p className="text-gray-400 text-xs mt-1">
            {format(subDays(new Date(), 6), 'MMM dd')} - {format(new Date(), 'MMM dd, yyyy')}
          </p>
        </div>
        
        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <User size={14} className="mr-1" /> Total Users
          </h3>
          <div className="text-xl font-mono text-white">{users.length}</div>
          <p className="text-gray-400 text-xs mt-1">
            {users.filter(u => u.active).length} currently active
          </p>
        </div>
        
        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <MapPin size={14} className="mr-1" /> Total Distance
          </h3>
          <div className="text-xl font-mono text-white">
            {userStats.reduce((total, stat) => 
              total + stat.distanceTraveled.reduce((sum, day) => sum + day.value, 0), 0
            )} km
          </div>
          <p className="text-gray-400 text-xs mt-1">Combined for all users</p>
        </div>
        
        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <Clock size={14} className="mr-1" /> Time Tracked
          </h3>
          <div className="text-xl font-mono text-white">168 hours</div>
          <p className="text-gray-400 text-xs mt-1">Full week of tracking</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="cyber-panel p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-neon-green/50 mr-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">{user.name}</h3>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono">
                  <span className="text-neon-green">{getTotalDistance(user.id)} km</span> 
                  <span className="text-gray-400 text-xs ml-1">total</span>
                </div>
                <div className="flex items-center justify-end text-xs">
                  {getDistanceChange(user.id).increased ? (
                    <>
                      <ArrowUp size={12} className="text-neon-green mr-1" />
                      <span className="text-neon-green">{getDistanceChange(user.id).change}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown size={12} className="text-alert-orange mr-1" />
                      <span className="text-alert-orange">{getDistanceChange(user.id).change}%</span>
                    </>
                  )}
                  <span className="text-gray-500 ml-1">vs yesterday</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-300 mb-2">Distance Traveled (Last 7 Days)</h4>
                <div className="h-12 flex items-end space-x-1">
                  {userStats
                    .find(stat => stat.userId === user.id)
                    ?.distanceTraveled
                    .slice()
                    .reverse()
                    .map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-neon-green/80 rounded-t" 
                          style={{ height: `${(day.value / 15) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">
                          {format(new Date(day.date), 'dd')}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-cyber-gray/50 p-2 rounded">
                  <div className="text-xs text-gray-400 mb-1">Home</div>
                  <div className="text-sm text-white font-mono">
                    {formatMinutes(
                      userStats
                        .find(stat => stat.userId === user.id)
                        ?.timeAtLocations
                        .find(loc => loc.locationName === 'Home')
                        ?.minutes || 0
                    )}
                  </div>
                </div>
                <div className="bg-cyber-gray/50 p-2 rounded">
                  <div className="text-xs text-gray-400 mb-1">Work/School</div>
                  <div className="text-sm text-white font-mono">
                    {formatMinutes(
                      userStats
                        .find(stat => stat.userId === user.id)
                        ?.timeAtLocations
                        .find(loc => loc.locationName === 'Work/School')
                        ?.minutes || 0
                    )}
                  </div>
                </div>
                <div className="bg-cyber-gray/50 p-2 rounded">
                  <div className="text-xs text-gray-400 mb-1">Battery</div>
                  <div className="text-sm text-white font-mono flex items-center">
                    <Battery size={14} className="mr-1" />
                    {getLatestBatteryLevel(user.id)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;