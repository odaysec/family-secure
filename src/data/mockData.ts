import { User, LocationHistory, GeoFence } from '../types';
import { subHours, subDays, format } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    active: true,
    lastSeen: new Date().toISOString(),
    deviceName: 'iPhone 13 Pro'
  },
  {
    id: 'family-1',
    name: 'Wife',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'family',
    active: true,
    lastSeen: new Date().toISOString(),
    deviceName: 'Samsung Galaxy S23'
  },
  {
    id: 'family-2',
    name: 'Mother',
    avatar: 'https://i.pravatar.cc/150?img=10',
    role: 'family',
    active: false,
    lastSeen: subHours(new Date(), 2).toISOString(),
    deviceName: 'iPhone 12'
  },
  {
    id: 'child-1',
    name: 'Son',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'child',
    active: true,
    lastSeen: new Date().toISOString(),
    deviceName: 'Xiaomi Redmi Note 11'
  }
];

// Create a random path around a center point
const createRandomPath = (centerLat: number, centerLng: number, count: number, radius: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    // Create a point within the radius of the center
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const lat = centerLat + (distance * Math.cos(angle) * 0.0001);
    const lng = centerLng + (distance * Math.sin(angle) * 0.0001);
    
    // Generate random timestamp from 5 days ago to now
    const timestamp = subHours(new Date(), Math.floor(Math.random() * 120)).toISOString();
    
    points.push({
      id: `loc-${i}-${Date.now()}`,
      userId: '',  // Will be filled in below
      latitude: lat,
      longitude: lng,
      accuracy: Math.floor(Math.random() * 30) + 5,
      timestamp,
      batteryLevel: Math.floor(Math.random() * 100)
    });
  }
  
  // Sort by timestamp
  return points.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

// Create location histories for each user
export const mockLocationHistory: LocationHistory[] = mockUsers.map(user => {
  // Different centers for each user
  let centerLat, centerLng;
  
  switch(user.id) {
    case 'admin-1':
      centerLat = -6.2088;
      centerLng = 106.8456;
      break;
    case 'family-1':
      centerLat = -6.2100;
      centerLng = 106.8470;
      break;
    case 'family-2':
      centerLat = -6.2110;
      centerLng = 106.8490;
      break;
    case 'child-1':
      centerLat = -6.2120;
      centerLng = 106.8440;
      break;
    default:
      centerLat = -6.2088;
      centerLng = 106.8456;
  }
  
  const points = createRandomPath(centerLat, centerLng, 30, 200);
  
  // Set user ID for all points
  const userPoints = points.map(point => ({
    ...point,
    userId: user.id
  }));
  
  return {
    userId: user.id,
    points: userPoints
  };
});

export const mockGeoFences: GeoFence[] = [
  {
    id: 'fence-1',
    name: 'Home',
    type: 'circle',
    coordinates: [],
    center: [-6.2088, 106.8456],
    radius: 500, // 500 meters
    color: '#00ff9d',
    active: true,
    notifyOnEnter: true,
    notifyOnExit: true,
    appliesTo: ['family-1', 'family-2', 'child-1']
  },
  {
    id: 'fence-2',
    name: 'School',
    type: 'circle',
    coordinates: [],
    center: [-6.2125, 106.8440],
    radius: 200, // 200 meters
    color: '#00f0ff',
    active: true,
    notifyOnEnter: true,
    notifyOnExit: true,
    appliesTo: ['child-1']
  },
  {
    id: 'fence-3',
    name: 'Office',
    type: 'circle',
    coordinates: [],
    center: [-6.2100, 106.8470],
    radius: 300, // 300 meters
    color: '#ff9f1c',
    active: true,
    notifyOnEnter: true,
    notifyOnExit: true,
    appliesTo: ['admin-1', 'family-1']
  }
];