import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { LocationProvider } from './context/LocationContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);