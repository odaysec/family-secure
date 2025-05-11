import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationPoint, LocationHistory, GeoFence, Notification } from '../types';
import { mockLocationHistory, mockGeoFences } from '../data/mockData';
import { format } from 'date-fns';

interface LocationContextType {
  currentLocations: LocationPoint[];
  locationHistory: LocationHistory[];
  geoFences: GeoFence[];
  notifications: Notification[];
  updateLocation: (userId: string, location: Omit<LocationPoint, 'id' | 'userId' | 'timestamp'>) => void;
  addGeoFence: (fence: Omit<GeoFence, 'id'>) => void;
  updateGeoFence: (id: string, data: Partial<GeoFence>) => void;
  removeGeoFence: (id: string) => void;
  clearNotification: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locationHistory, setLocationHistory] = useState<LocationHistory[]>(mockLocationHistory);
  const [geoFences, setGeoFences] = useState<GeoFence[]>(mockGeoFences);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Extract current locations (most recent for each user)
  const currentLocations = locationHistory.map(history => {
    const sortedPoints = [...history.points].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return sortedPoints[0];
  });
  
  // Check geo-fence violations whenever locations update
  useEffect(() => {
    checkGeoFenceViolations();
  }, [currentLocations]);

  const updateLocation = (userId: string, location: Omit<LocationPoint, 'id' | 'userId' | 'timestamp'>) => {
    const timestamp = new Date().toISOString();
    const newPoint: LocationPoint = {
      id: `loc-${Date.now()}`,
      userId,
      timestamp,
      ...location
    };

    setLocationHistory(prev => {
      const userHistoryIndex = prev.findIndex(h => h.userId === userId);
      
      if (userHistoryIndex >= 0) {
        // Add to existing user history
        const updatedHistory = [...prev];
        updatedHistory[userHistoryIndex] = {
          ...updatedHistory[userHistoryIndex],
          points: [...updatedHistory[userHistoryIndex].points, newPoint]
        };
        return updatedHistory;
      } else {
        // Create new history for user
        return [...prev, { userId, points: [newPoint] }];
      }
    });
  };

  const checkGeoFenceViolations = () => {
    // This is a simplified version - in a real app, you'd need proper geo calculations
    const violations: Notification[] = [];
    
    currentLocations.forEach(location => {
      const userFences = geoFences.filter(fence => 
        fence.active && fence.appliesTo.includes(location.userId)
      );
      
      userFences.forEach(fence => {
        // Simple circular geo-fence check for demo
        if (fence.type === 'circle' && fence.center) {
          const distance = calculateDistance(
            location.latitude, 
            location.longitude, 
            fence.center[0], 
            fence.center[1]
          );
          
          const insideFence = distance <= (fence.radius || 0);
          
          // Check for fence entry/exit based on previous location
          const userHistory = locationHistory.find(h => h.userId === location.userId);
          
          if (userHistory && userHistory.points.length > 1) {
            const sortedPoints = [...userHistory.points].sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            
            // Get previous location
            const prevLocation = sortedPoints[1];
            const prevDistance = calculateDistance(
              prevLocation.latitude,
              prevLocation.longitude,
              fence.center[0],
              fence.center[1]
            );
            const wasInsideFence = prevDistance <= (fence.radius || 0);
            
            // Generate notifications for crossing boundaries
            if (insideFence && !wasInsideFence && fence.notifyOnEnter) {
              violations.push({
                id: `notif-${Date.now()}-${Math.random()}`,
                type: 'info',
                message: `User entered geo-fence: ${fence.name}`,
                userId: location.userId,
                timestamp: new Date().toISOString(),
                read: false
              });
            } else if (!insideFence && wasInsideFence && fence.notifyOnExit) {
              violations.push({
                id: `notif-${Date.now()}-${Math.random()}`,
                type: 'alert',
                message: `User exited geo-fence: ${fence.name}`,
                userId: location.userId,
                timestamp: new Date().toISOString(),
                read: false
              });
            }
          }
        }
      });
    });
    
    if (violations.length > 0) {
      setNotifications(prev => [...violations, ...prev]);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    // Simple Haversine distance calculation
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const addGeoFence = (fence: Omit<GeoFence, 'id'>) => {
    const newFence: GeoFence = {
      ...fence,
      id: `fence-${Date.now()}`
    };
    setGeoFences(prev => [...prev, newFence]);
  };

  const updateGeoFence = (id: string, data: Partial<GeoFence>) => {
    setGeoFences(prev => 
      prev.map(fence => 
        fence.id === id ? { ...fence, ...data } : fence
      )
    );
  };

  const removeGeoFence = (id: string) => {
    setGeoFences(prev => prev.filter(fence => fence.id !== id));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <LocationContext.Provider value={{
      currentLocations,
      locationHistory,
      geoFences,
      notifications,
      updateLocation,
      addGeoFence,
      updateGeoFence,
      removeGeoFence,
      clearNotification,
      markAllNotificationsAsRead
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};