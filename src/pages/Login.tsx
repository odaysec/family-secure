import React, { useState } from 'react';
import { Shield, Lock, User, EyeOff, Eye } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const { login, users } = useUser();
  const [userId, setUserId] = useState('admin-1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const success = login(userId, password);
      
      if (!success) {
        setError('Invalid credentials');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col justify-center p-6 bg-grid-pattern">
      <div className="scanline"></div>
      
      <div className="mx-auto w-full max-w-md">
        <div className="cyber-panel p-8 bg-cyber-dark/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyber-gray border border-neon-green mb-4">
              <Shield size={40} className="text-neon-green" />
            </div>
            
            <h1 className="font-terminal text-3xl text-neon-green">
              FAMILY<span className="text-white opacity-80">SECURE</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Private Secure Family Tracking System
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-alert-red/10 border border-alert-red text-alert-red p-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="userId" className="block text-sm font-mono text-gray-300">
                Select User
              </label>
              <div className="relative">
                <select
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="terminal-input w-full pl-10"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
                <User 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-green" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-mono text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="terminal-input w-full pl-10 pr-10"
                  placeholder="Enter secure password"
                />
                <Lock 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-green" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-green"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                For demo: any password will work
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="cyber-button w-full py-3"
            >
              {loading ? (
                <span className="loading-dots">Authenticating</span>
              ) : (
                <>
                  <Lock size={16} />
                  Secure Login
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-gray-500">
            Private home server deployment • End-to-end encryption • v0.1.0
          </p>
          <p className="text-xs text-gray-500">
            Created by <a href="https://github.com/odaysec" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">@odaysec</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;