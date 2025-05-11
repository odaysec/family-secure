import React, { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, RefreshCw, User, Shield, Smartphone } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { format, formatDistanceToNow } from 'date-fns';

const UserManagement: React.FC = () => {
  const { users, addUser, updateUser, removeUser } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'family',
    deviceName: ''
  });

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
      removeUser(userId);
    }
  };

  const handleEdit = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setFormData({
        name: user.name,
        role: user.role,
        deviceName: user.deviceName || ''
      });
      setEditingUser(userId);
      setShowAddModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      updateUser(editingUser, {
        name: formData.name,
        role: formData.role as 'admin' | 'family' | 'child',
        deviceName: formData.deviceName
      });
    } else {
      addUser({
        name: formData.name,
        role: formData.role as 'admin' | 'family' | 'child',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        active: false,
        lastSeen: new Date().toISOString(),
        deviceName: formData.deviceName
      });
    }
    
    setShowAddModal(false);
    setEditingUser(null);
    setFormData({ name: '', role: 'family', deviceName: '' });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-mono text-neon-green flex items-center">
            <Users className="inline-block mr-2" size={24} />
            Family Members
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage users and devices connected to your security system
          </p>
        </div>
        
        <button
          onClick={() => {
            setFormData({ name: '', role: 'family', deviceName: '' });
            setEditingUser(null);
            setShowAddModal(true);
          }}
          className="cyber-button"
        >
          <UserPlus size={16} />
          Add Member
        </button>
      </header>

      <div className="cyber-panel overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-cyber-gray">
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">User</th>
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">Role</th>
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">Device</th>
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">Last Active</th>
              <th className="py-3 px-4 text-left text-xs font-mono uppercase text-neon-green tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-light">
            {users.map(user => (
              <tr key={user.id} className="bg-cyber-dark hover:bg-cyber-gray/30">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border border-neon-green/30">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-neon-green/10 text-neon-green' 
                        : user.role === 'family' 
                          ? 'bg-neon-blue/10 text-neon-blue' 
                          : 'bg-alert-orange/10 text-alert-orange'
                    }`}
                  >
                    {user.role === 'admin' && <Shield size={12} className="mr-1" />}
                    {user.role === 'family' && <User size={12} className="mr-1" />}
                    {user.role === 'child' && <User size={12} className="mr-1" />}
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span 
                    className={`inline-flex items-center gap-1 ${
                      user.active ? 'text-neon-green' : 'text-gray-400'
                    }`}
                  >
                    <span 
                      className={`w-2 h-2 rounded-full ${
                        user.active ? 'bg-neon-green animate-pulse' : 'bg-gray-500'
                      }`}
                    ></span>
                    {user.active ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center text-gray-300">
                    <Smartphone size={14} className="mr-1 text-gray-400" />
                    {user.deviceName || 'Unknown'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-300">
                    {formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(user.lastSeen), 'MMM dd, yyyy HH:mm')}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(user.id)}
                      className="p-1 rounded hover:bg-cyber-light text-gray-400 hover:text-neon-blue"
                      title="Edit user"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-1 rounded hover:bg-cyber-light text-gray-400 hover:text-alert-red"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="p-1 rounded hover:bg-cyber-light text-gray-400 hover:text-neon-green"
                      title="Refresh status"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-cyber-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="cyber-panel w-full max-w-md p-6">
            <h2 className="text-xl text-neon-green font-mono mb-4">
              {editingUser ? 'Edit Family Member' : 'Add Family Member'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="terminal-input w-full"
                  placeholder="Enter name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="terminal-input w-full"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="family">Family</option>
                  <option value="child">Child</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="deviceName" className="block text-sm font-medium text-gray-300 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  id="deviceName"
                  value={formData.deviceName}
                  onChange={(e) => setFormData({...formData, deviceName: e.target.value})}
                  className="terminal-input w-full"
                  placeholder="e.g. iPhone 13 Pro"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-cyber-gray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cyber-button"
                >
                  {editingUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;