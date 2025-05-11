import React, { useState } from 'react';
import LocationMap from '../components/Map/LocationMap';
import { Radar, Radio, Calendar, Clock, Battery, ActivitySquare, ArrowUpRight } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useUser } from '../context/UserContext';
import { format, formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const { currentLocations, locationHistory } = useLocation();
  const { users } = useUser();
  const [selectedTab, setSelectedTab] = useState<'map' | 'activity'>('map');

  const getUserDetails = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  return (
    <div className="space-y-4">
      <header className="mb-6">
        <h1 className="text-2xl font-mono text-neon-green">
          <ActivitySquare className="inline-block mr-2" size={24} />
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Real-time location monitoring and family security status
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <Radar size={14} className="mr-1" /> Active Trackers
          </h3>
          <div className="text-3xl font-mono text-white">
            {users.filter(user => user.active).length}/{users.length}
          </div>
          <p className="text-gray-400 text-xs mt-1">Family members online</p>
        </div>

        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <Calendar size={14} className="mr-1" /> System Date
          </h3>
          <div className="text-2xl font-mono text-white">
            {format(new Date(), 'yyyy-MM-dd')}
          </div>
          <p className="text-gray-400 text-xs mt-1">{format(new Date(), 'EEEE, MMMM do')}</p>
        </div>

        <div className="cyber-panel p-4">
          <h3 className="text-neon-green text-xs uppercase tracking-wider mb-2 flex items-center">
            <Clock size={14} className="mr-1" /> Local Time
          </h3>
          <div className="text-2xl font-mono text-white">
            {format(new Date(), 'HH:mm:ss')}
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Last update: {formatDistanceToNow(new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="flex border-b border-neon-green/20 mb-4">
        <button
          className={`cyber-tab ${selectedTab === 'map' ? 'active' : 'inactive'}`}
          onClick={() => setSelectedTab('map')}
        >
          Interactive Map
        </button>
        <button
          className={`cyber-tab ${selectedTab === 'activity' ? 'active' : 'inactive'}`}
          onClick={() => setSelectedTab('activity')}
        >
          Family Activity
        </button>
      </div>

      {selectedTab === 'map' ? (
        <LocationMap />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLocations.map(location => {
            const user = getUserDetails(location.userId);
            if (!user) return null;

            return (
              <div key={location.id} className="cyber-panel p-4">
                <div className="flex items-center justify-between mb-3">
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
                      <p className="text-xs text-gray-400">{user.deviceName || 'Unknown device'}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${user.active ? 'bg-neon-green/10 text-neon-green' : 'bg-gray-500/10 text-gray-400'}`}>
                    {user.active ? 'Online' : 'Offline'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-cyber-gray/50 p-2 rounded">
                    <div className="text-xs text-gray-400 mb-1 flex items-center">
                      <Clock size={12} className="mr-1" /> Last Seen
                    </div>
                    <div className="text-sm text-white font-mono">
                      {formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}
                    </div>
                  </div>
                  <div className="bg-cyber-gray/50 p-2 rounded">
                    <div className="text-xs text-gray-400 mb-1 flex items-center">
                      <Battery size={12} className="mr-1" /> Battery
                    </div>
                    <div className="text-sm text-white font-mono">
                      {location.batteryLevel || 'N/A'}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 border-t border-neon-green/10 pt-3">
                  <div>
                    Lat: {location.latitude.toFixed(6)}, Lon: {location.longitude.toFixed(6)}
                  </div>
                  <button className="text-neon-green flex items-center">
                    Details <ArrowUpRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;