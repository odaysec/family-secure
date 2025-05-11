import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, Polyline } from 'react-leaflet';
import { useLocation } from '../../context/LocationContext';
import { useUser } from '../../context/UserContext';
import { Icon } from 'leaflet';
import { format } from 'date-fns';

// Define custom marker icons
const createUserIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' stroke='%23${color.replace('#', '')}' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3Cpath d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z'/%3E%3C/svg%3E`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const mapIcons = {
  'admin': createUserIcon('00ff9d'),
  'family': createUserIcon('00f0ff'),
  'child': createUserIcon('ff9f1c')
};

const LocationMap: React.FC = () => {
  const { currentLocations, locationHistory, geoFences } = useLocation();
  const { users } = useUser();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showPaths, setShowPaths] = useState(true);

  const center = currentLocations.length > 0 
    ? [currentLocations[0].latitude, currentLocations[0].longitude] 
    : [-6.2088, 106.8456]; // Default to Jakarta
  
  const getUserRole = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.role : 'admin';
  };
  
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };
  
  const getUserColor = (userId: string) => {
    const role = getUserRole(userId);
    switch (role) {
      case 'admin': return '#00ff9d';
      case 'family': return '#00f0ff';
      case 'child': return '#ff9f1c';
      default: return '#00ff9d';
    }
  };
  
  const getUserPath = (userId: string) => {
    const history = locationHistory.find(h => h.userId === userId);
    if (!history) return [];
    
    return history.points
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(point => [point.latitude, point.longitude]);
  };

  return (
    <div className="cyber-panel h-[500px] w-full relative">
      <div className="absolute top-4 right-4 z-[500] space-y-2">
        <div className="cyber-panel p-2 bg-cyber-gray/80 backdrop-blur">
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-xs text-white flex items-center">
              <input 
                type="checkbox" 
                checked={showPaths} 
                onChange={() => setShowPaths(!showPaths)}
                className="mr-1"
              />
              Show Paths
            </label>
          </div>
          <div className="space-y-1">
            {users.map(user => (
              <button 
                key={user.id}
                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                className={`flex items-center text-xs px-2 py-1 rounded w-full ${
                  selectedUser === user.id ? 'bg-cyber-black' : 'hover:bg-cyber-black/50'
                }`}
              >
                <span 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: getUserColor(user.id) }}
                ></span>
                <span 
                  className={selectedUser === user.id ? 'text-white' : 'text-gray-300'}
                >
                  {user.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <MapContainer 
        center={[center[0], center[1]] as [number, number]} 
        zoom={13} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render geo-fences */}
        {geoFences.map(fence => (
          fence.type === 'circle' && fence.center && (
            <Circle 
              key={fence.id}
              center={fence.center as [number, number]}
              radius={fence.radius || 100}
              pathOptions={{ 
                color: fence.color, 
                fillColor: fence.color, 
                fillOpacity: 0.1,
                opacity: 0.6,
                weight: 2,
                dashArray: '5, 5'
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{fence.name}</div>
                  <div>Radius: {fence.radius}m</div>
                  <div className="text-xs text-gray-600">
                    {fence.notifyOnEnter ? 'Entry alerts enabled' : 'Entry alerts disabled'} •&nbsp;
                    {fence.notifyOnExit ? 'Exit alerts enabled' : 'Exit alerts disabled'}
                  </div>
                </div>
              </Popup>
            </Circle>
          )
        ))}

        {/* Render user paths */}
        {showPaths && locationHistory.map(history => {
          if (selectedUser && selectedUser !== history.userId) return null;
          
          const path = getUserPath(history.userId);
          return (
            <Polyline
              key={`path-${history.userId}`}
              positions={path as [number, number][]}
              pathOptions={{
                color: getUserColor(history.userId),
                opacity: 0.7,
                weight: 3,
              }}
            />
          );
        })}
        
        {/* Render user locations */}
        {currentLocations.map(location => {
          if (selectedUser && selectedUser !== location.userId) return null;
          
          const role = getUserRole(location.userId);
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={mapIcons[role as keyof typeof mapIcons]}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{getUserName(location.userId)}</div>
                  <div>Accuracy: {location.accuracy}m</div>
                  {location.batteryLevel !== undefined && (
                    <div>Battery: {location.batteryLevel}%</div>
                  )}
                  <div className="text-xs text-gray-600 mt-1">
                    Last updated: {format(new Date(location.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LocationMap;