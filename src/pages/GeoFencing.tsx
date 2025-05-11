import React, { useState } from 'react';
import { Map, Target, Plus, Edit2, Trash, ToggleLeft, ToggleRight } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useUser } from '../context/UserContext';
import { GeoFence } from '../types';
import LocationMap from '../components/Map/LocationMap';

const GeoFencing: React.FC = () => {
  const { geoFences, addGeoFence, updateGeoFence, removeGeoFence } = useLocation();
  const { users } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFence, setEditingFence] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<GeoFence, 'id'>>({
    name: '',
    type: 'circle',
    coordinates: [],
    center: [-6.2088, 106.8456],
    radius: 500,
    color: '#00ff9d',
    active: true,
    notifyOnEnter: true,
    notifyOnExit: true,
    appliesTo: []
  });

  const handleEdit = (fenceId: string) => {
    const fence = geoFences.find(f => f.id === fenceId);
    if (fence) {
      setFormData({
        name: fence.name,
        type: fence.type,
        coordinates: fence.coordinates,
        center: fence.center,
        radius: fence.radius,
        color: fence.color,
        active: fence.active,
        notifyOnEnter: fence.notifyOnEnter,
        notifyOnExit: fence.notifyOnExit,
        appliesTo: fence.appliesTo
      });
      setEditingFence(fenceId);
      setShowAddModal(true);
    }
  };

  const handleDelete = (fenceId: string) => {
    if (confirm('Are you sure you want to delete this geo-fence?')) {
      removeGeoFence(fenceId);
    }
  };

  const toggleActive = (fenceId: string, active: boolean) => {
    updateGeoFence(fenceId, { active });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFence) {
      updateGeoFence(editingFence, formData);
    } else {
      addGeoFence(formData);
    }
    
    setShowAddModal(false);
    setEditingFence(null);
    setFormData({
      name: '',
      type: 'circle',
      coordinates: [],
      center: [-6.2088, 106.8456],
      radius: 500,
      color: '#00ff9d',
      active: true,
      notifyOnEnter: true,
      notifyOnExit: true,
      appliesTo: []
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-mono text-neon-green flex items-center">
            <Map className="inline-block mr-2" size={24} />
            Geo-Fencing
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create and manage secure areas for location-based alerts
          </p>
        </div>
        
        <button
          onClick={() => {
            setEditingFence(null);
            setShowAddModal(true);
          }}
          className="cyber-button"
        >
          <Plus size={16} />
          Add Geo-Fence
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LocationMap />
        </div>
        
        <div className="space-y-4">
          <div className="cyber-panel p-4">
            <h3 className="text-neon-green text-sm font-mono flex items-center mb-3">
              <Target size={16} className="mr-2" />
              Active Geo-Fences
            </h3>
            
            {geoFences.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-gray-500">No geo-fences defined</div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="mt-2 text-neon-green text-sm hover:underline"
                >
                  Create your first geo-fence
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {geoFences.map(fence => (
                  <div 
                    key={fence.id}
                    className={`p-3 border rounded-md ${
                      fence.active 
                        ? 'border-neon-green/30 bg-neon-green/5' 
                        : 'border-gray-700 bg-cyber-gray/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: fence.color }}
                          ></div>
                          <h4 className="text-white font-medium">{fence.name}</h4>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Radius: {fence.radius}m • {fence.appliesTo.length} members
                        </div>
                      </div>
                      <button
                        onClick={() => toggleActive(fence.id, !fence.active)}
                        className="text-gray-400 hover:text-neon-green"
                      >
                        {fence.active ? (
                          <ToggleRight size={20} className="text-neon-green" />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <div className={fence.notifyOnEnter ? 'text-neon-green' : ''}>
                        Entry {fence.notifyOnEnter ? '✓' : '✗'}
                      </div>
                      <span className="mx-2">•</span>
                      <div className={fence.notifyOnExit ? 'text-neon-green' : ''}>
                        Exit {fence.notifyOnExit ? '✓' : '✗'}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-cyber-gray/50 flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(fence.id)}
                        className="p-1 rounded hover:bg-cyber-dark text-gray-400 hover:text-neon-blue"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(fence.id)}
                        className="p-1 rounded hover:bg-cyber-dark text-gray-400 hover:text-alert-red"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Geo-Fence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-cyber-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="cyber-panel w-full max-w-md p-6">
            <h2 className="text-xl text-neon-green font-mono mb-4">
              {editingFence ? 'Edit Geo-Fence' : 'Add New Geo-Fence'}
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
                  placeholder="e.g. Home, School, Work"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'circle' | 'polygon'})}
                  className="terminal-input w-full"
                >
                  <option value="circle">Circle</option>
                  <option value="polygon" disabled>Polygon (Coming Soon)</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="radius" className="block text-sm font-medium text-gray-300 mb-1">
                    Radius (meters)
                  </label>
                  <input
                    type="number"
                    id="radius"
                    value={formData.radius}
                    min={50}
                    max={10000}
                    onChange={(e) => setFormData({...formData, radius: parseInt(e.target.value)})}
                    className="terminal-input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-1">
                    Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="mr-2 w-10 h-8 rounded border border-neon-green/30 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="terminal-input w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-300 mb-2">
                  Notification Settings
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifyOnEnter}
                      onChange={(e) => setFormData({...formData, notifyOnEnter: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Notify when entering zone</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifyOnExit}
                      onChange={(e) => setFormData({...formData, notifyOnExit: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Notify when exiting zone</span>
                  </label>
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-300 mb-2">
                  Applied To (Members)
                </p>
                <div className="terminal-input h-32 overflow-y-auto p-2">
                  {users.map(user => (
                    <label key={user.id} className="flex items-center p-1 hover:bg-cyber-gray rounded">
                      <input
                        type="checkbox"
                        checked={formData.appliesTo.includes(user.id)}
                        onChange={(e) => {
                          const updatedUsers = e.target.checked
                            ? [...formData.appliesTo, user.id]
                            : formData.appliesTo.filter(id => id !== user.id);
                          setFormData({...formData, appliesTo: updatedUsers});
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-300">{user.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({user.role})</span>
                    </label>
                  ))}
                </div>
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
                  {editingFence ? 'Update' : 'Add'} Geo-Fence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoFencing;