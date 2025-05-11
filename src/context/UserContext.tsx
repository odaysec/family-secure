import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface UserContextType {
  users: User[];
  currentUser: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // On initial load, check for saved login
  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      const user = users.find(u => u.id === savedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, []);

  const login = (userId: string, password: string): boolean => {
    // Simple mock authentication - in a real app, this would validate against secure credentials
    // Password is ignored for the demo
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUserId', user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
    };
    setUsers(prev => [...prev, newUser as User]);
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...data } : user
      )
    );
    
    // Update current user if that's the one being updated
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      currentUser, 
      login, 
      logout, 
      addUser, 
      updateUser, 
      removeUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};