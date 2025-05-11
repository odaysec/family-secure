export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'family' | 'child';
  active: boolean;
  lastSeen: string;
  deviceName?: string;
}

export interface LocationPoint {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  batteryLevel?: number;
  address?: string;
}

export interface LocationHistory {
  userId: string;
  points: LocationPoint[];
}

export interface GeoFence {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  coordinates: number[][];
  radius?: number;
  center?: [number, number];
  color: string;
  active: boolean;
  notifyOnEnter: boolean;
  notifyOnExit: boolean;
  appliesTo: string[]; // User IDs
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'alert';
  message: string;
  userId?: string;
  timestamp: string;
  read: boolean;
}

export interface StatPoint {
  date: string;
  value: number;
}

export interface UserStats {
  userId: string;
  distanceTraveled: StatPoint[];
  timeAtLocations: {
    locationName: string;
    minutes: number;
  }[];
  batteryHistory: StatPoint[];
}