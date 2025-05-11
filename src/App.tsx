import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import GeoFencing from './pages/GeoFencing';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import { useUser } from './context/UserContext';

function App() {
  const { currentUser } = useUser();

  return (
    <>
      <div className="scanline"></div>
      <Routes>
        {!currentUser ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/geofencing" element={<GeoFencing />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;