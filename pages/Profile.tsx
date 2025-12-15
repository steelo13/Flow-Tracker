
import React, { useState, useRef } from 'react';
import { UserSettings } from '../types';
import { Camera, Activity, ChevronRight, LogOut, FileText, Shield, Baby, Moon, Droplet, Minus, Plus } from 'lucide-react';

interface ProfileProps {
  userSettings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
}

const Profile: React.FC<ProfileProps> = ({ userSettings, onUpdateSettings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state for form editing
  const [editForm, setEditForm] = useState({
    name: userSettings.name,
    cycleLength: userSettings.cycleLength,
    periodLength: userSettings.periodLength,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpdateSettings({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    onUpdateSettings(editForm);
    setIsEditing(false);
  };

  const togglePregnancyMode = () => {
    onUpdateSettings({ pregnancyMode: !userSettings.pregnancyMode });
  };

  const updateGoal = (field: 'waterGoal' | 'sleepGoal', delta: number) => {
    const current = userSettings[field] || (field === 'waterGoal' ? 8 : 8);
    const newValue = Math.max(0, current + delta);
    onUpdateSettings({ [field]: newValue });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-24 overflow-y-auto animate-fade-in">
      {/* Header Profile Section */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm mb-6">
        <div className="flex flex-col items-center">
          <div 
            className="relative group cursor-pointer mb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-24 h-24 rounded-full border-4 border-purple-100 overflow-hidden shadow-md">
              <img 
                src={userSettings.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80"} 
                className="w-full h-full object-cover transition-opacity group-hover:opacity-80" 
                alt="Profile" 
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
              <Camera size={16} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>

          {!isEditing ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{userSettings.name}</h1>
              <p className="text-sm text-gray-400 mb-4">FlowTracker Member</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-purple-600 text-sm font-bold bg-purple-50 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="w-full max-w-xs space-y-3 bg-gray-50 p-4 rounded-xl">
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 text-sm"
                  />
               </div>
               <div className="flex space-x-2">
                 <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Cycle Days</label>
                    <input 
                        type="number" 
                        value={editForm.cycleLength}
                        onChange={(e) => setEditForm({...editForm, cycleLength: parseInt(e.target.value) || 28})}
                        className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 text-sm"
                    />
                 </div>
                 <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Period Days</label>
                    <input 
                        type="number" 
                        value={editForm.periodLength}
                        onChange={(e) => setEditForm({...editForm, periodLength: parseInt(e.target.value) || 5})}
                        className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 text-sm"
                    />
                 </div>
               </div>
               <div className="flex space-x-2 pt-2">
                 <button onClick={saveProfile} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-bold text-sm">Save</button>
                 <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg font-bold text-sm">Cancel</button>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-6">
        
        {/* Pregnancy Mode */}
        <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-4 shadow-sm border border-pink-100">
           <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <div className="bg-pink-100 p-2 rounded-full">
                    <Baby className="text-pink-500" size={24} />
                 </div>
                 <div>
                    <h2 className="font-bold text-gray-800">Pregnancy Mode</h2>
                    <p className="text-xs text-gray-500">Pause predictions & track baby</p>
                 </div>
              </div>
              <button 
                  onClick={togglePregnancyMode}
                  className={`w-12 h-6 rounded-full transition-colors relative ${userSettings.pregnancyMode ? 'bg-pink-500' : 'bg-gray-200'}`}
                >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${userSettings.pregnancyMode ? 'translate-x-6' : ''}`}></div>
                </button>
           </div>
        </div>

        {/* Wellness Goals */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Wellness Goals</h2>
          
          <div className="space-y-4">
             {/* Sleep Goal */}
             <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                <div className="flex items-center space-x-3">
                   <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Moon size={18} className="text-indigo-500" />
                   </div>
                   <div>
                       <span className="text-sm font-bold text-gray-700 block">Sleep Target</span>
                       <span className="text-xs text-gray-400">Hours per night</span>
                   </div>
                </div>
                <div className="flex items-center space-x-3">
                   <button onClick={() => updateGoal('sleepGoal', -0.5)} className="w-8 h-8 rounded-full bg-white text-gray-500 shadow-sm flex items-center justify-center hover:bg-indigo-100">
                      <Minus size={14} />
                   </button>
                   <span className="font-bold text-gray-800 w-8 text-center">{userSettings.sleepGoal || 8}</span>
                   <button onClick={() => updateGoal('sleepGoal', 0.5)} className="w-8 h-8 rounded-full bg-indigo-500 text-white shadow-sm flex items-center justify-center hover:bg-indigo-600">
                      <Plus size={14} />
                   </button>
                </div>
             </div>

             {/* Water Goal */}
             <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                   <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Droplet size={18} className="text-blue-500" />
                   </div>
                   <div>
                       <span className="text-sm font-bold text-gray-700 block">Hydration</span>
                       <span className="text-xs text-gray-400">Cups per day</span>
                   </div>
                </div>
                <div className="flex items-center space-x-3">
                   <button onClick={() => updateGoal('waterGoal', -1)} className="w-8 h-8 rounded-full bg-white text-gray-500 shadow-sm flex items-center justify-center hover:bg-blue-100">
                      <Minus size={14} />
                   </button>
                   <span className="font-bold text-gray-800 w-8 text-center">{userSettings.waterGoal || 8}</span>
                   <button onClick={() => updateGoal('waterGoal', 1)} className="w-8 h-8 rounded-full bg-blue-500 text-white shadow-sm flex items-center justify-center hover:bg-blue-600">
                      <Plus size={14} />
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Useful Info / Cycle Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
           <div className="flex items-center space-x-2 mb-4">
             <Activity className="text-teal-500" size={20} />
             <h2 className="font-bold text-gray-800">Cycle Overview</h2>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{userSettings.cycleLength}</span>
                <span className="text-xs text-gray-400">Avg Cycle Days</span>
             </div>
             <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{userSettings.periodLength}</span>
                <span className="text-xs text-gray-400">Avg Period Days</span>
             </div>
           </div>
           <button className="w-full mt-4 flex items-center justify-between p-3 bg-teal-50 text-teal-700 rounded-xl font-medium text-sm hover:bg-teal-100 transition-colors">
              <span>View full cycle history</span>
              <ChevronRight size={16} />
           </button>
        </div>

        {/* Support & Privacy */}
        <div className="bg-white rounded-2xl p-1 shadow-sm overflow-hidden">
           <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
               <div className="flex items-center space-x-3">
                   <div className="p-2 bg-blue-50 rounded-lg">
                     <Shield size={18} className="text-blue-500" />
                   </div>
                   <span className="text-gray-700 font-medium text-sm">Privacy Policy</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
               <div className="flex items-center space-x-3">
                   <div className="p-2 bg-purple-50 rounded-lg">
                     <FileText size={18} className="text-purple-500" />
                   </div>
                   <span className="text-gray-700 font-medium text-sm">Terms of Use</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
           </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
               <div className="flex items-center space-x-3">
                   <div className="p-2 bg-rose-50 rounded-lg">
                     <LogOut size={18} className="text-rose-500" />
                   </div>
                   <span className="text-gray-700 font-medium text-sm">Log Out</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
           </button>
        </div>

        <div className="text-center pb-6">
           <p className="text-xs text-gray-300">Version 2.4.0 • FlowTracker Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
