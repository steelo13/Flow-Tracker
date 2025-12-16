
import React, { useState, useRef } from 'react';
import { UserSettings } from '../types';
import { Camera, Activity, ChevronRight, LogOut, FileText, Shield, Moon, Droplet, Minus, Plus, ArrowLeft } from 'lucide-react';

interface ProfileProps {
  userSettings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
}

type ProfileView = 'main' | 'history' | 'privacy' | 'terms';

const Profile: React.FC<ProfileProps> = ({ userSettings, onUpdateSettings }) => {
  const [activeView, setActiveView] = useState<ProfileView>('main');
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

  const updateGoal = (field: 'waterGoal' | 'sleepGoal', delta: number) => {
    const current = userSettings[field] || (field === 'waterGoal' ? 8 : 8);
    const newValue = Math.max(0, current + delta);
    onUpdateSettings({ [field]: newValue });
  };

  // --- Sub-Views ---

  const CycleHistoryView = () => {
    // Simulate history based on settings since we don't have a full historical DB
    const history = [];
    const currentStart = new Date(userSettings.lastPeriodStart);
    
    // Generate current + 5 past cycles
    for (let i = 0; i < 6; i++) {
        const start = new Date(currentStart);
        start.setDate(start.getDate() - (i * userSettings.cycleLength));
        
        const end = new Date(start);
        end.setDate(end.getDate() + userSettings.periodLength - 1);
        
        history.push({
            cycleNumber: i,
            startDate: start,
            endDate: end,
            length: userSettings.cycleLength,
            periodLength: userSettings.periodLength
        });
    }

    return (
        <div className="bg-white h-full overflow-y-auto pb-20 animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center z-10 shadow-sm">
                <button onClick={() => setActiveView('main')} className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="font-bold text-lg text-gray-800">Cycle History</h2>
            </div>
            <div className="p-4 space-y-4">
                {history.map((cycle, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-3">
                            <span className={`text-xs font-bold uppercase tracking-wider ${idx === 0 ? 'text-teal-600' : 'text-gray-400'}`}>
                                {idx === 0 ? 'Current Cycle' : `Previous Cycle`}
                            </span>
                            {idx === 0 && (
                                <span className="bg-teal-50 text-teal-600 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                                    Active
                                </span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800 text-lg">
                                    {cycle.startDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">Period Start</p>
                            </div>
                            <div className="flex flex-col items-center px-4">
                                <div className="h-px w-full bg-gray-200 mb-1"></div>
                                <span className="text-[10px] text-gray-400">{cycle.length} days</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-800 text-lg">
                                    {cycle.periodLength} Days
                                </p>
                                <p className="text-xs text-gray-500 font-medium">Duration</p>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="text-center p-4">
                    <p className="text-xs text-gray-400">
                        History is calculated based on your average cycle settings and last period date.
                    </p>
                </div>
            </div>
        </div>
    );
  };

  const TextPageView = ({ title, content }: { title: string, content: React.ReactNode }) => (
      <div className="bg-white h-full overflow-y-auto pb-20 animate-slide-in-right">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center z-10 shadow-sm">
            <button onClick={() => setActiveView('main')} className="p-2 hover:bg-gray-100 rounded-full mr-2 transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="font-bold text-lg text-gray-800">{title}</h2>
        </div>
        <div className="p-6 prose prose-sm prose-purple max-w-none text-gray-600 leading-relaxed">
            {content}
        </div>
      </div>
  );

  const PrivacyContent = (
      <div className="space-y-4">
        <p className="text-xs text-gray-400">Last updated: October 26, 2023</p>
        
        <h3 className="text-gray-900 font-bold text-base">1. Introduction</h3>
        <p>FlowTracker ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you use our mobile application.</p>
        
        <h3 className="text-gray-900 font-bold text-base">2. Information We Collect</h3>
        <p>We collect information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Personal Data:</strong> Name, cycle data, health symptoms.</li>
            <li><strong>Usage Data:</strong> Information about how you use our app.</li>
        </ul>

        <h3 className="text-gray-900 font-bold text-base">3. How We Use Your Information</h3>
        <p>We use the information we collect or receive:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>To facilitate account creation and logon process.</li>
            <li>To provide cycle predictions and health insights.</li>
            <li>To send you administrative information.</li>
        </ul>

        <h3 className="text-gray-900 font-bold text-base">4. Data Security</h3>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
        
        <h3 className="text-gray-900 font-bold text-base">5. Contact Us</h3>
        <p>If you have questions or comments about this policy, you may email us at support@flowtracker.app</p>
      </div>
  );

  const TermsContent = (
      <div className="space-y-4">
         <p className="text-xs text-gray-400">Last updated: October 26, 2023</p>
         
         <h3 className="text-gray-900 font-bold text-base">1. Agreement to Terms</h3>
         <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and FlowTracker ("we," "us" or "our"), concerning your access to and use of the FlowTracker application.</p>
         
         <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl my-4">
             <h3 className="text-rose-700 font-bold text-base mb-2">2. Medical Disclaimer</h3>
             <p className="text-rose-800 text-sm font-medium">FLOWTRACKER IS NOT A MEDICAL DEVICE AND DOES NOT PROVIDE MEDICAL ADVICE.</p>
             <p className="text-rose-600 text-sm mt-2">The contents of the App, such as text, graphics, images, and other material contained on the App are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
         </div>
         
         <h3 className="text-gray-900 font-bold text-base">3. User Representations</h3>
         <p>By using the App, you represent and warrant that:</p>
         <ul className="list-disc pl-5 space-y-1">
             <li>All registration information you submit will be true, accurate, current, and complete.</li>
             <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
             <li>You are not a minor in the jurisdiction in which you reside.</li>
         </ul>

         <h3 className="text-gray-900 font-bold text-base">4. Modifications</h3>
         <p>We reserve the right to change, modify, or remove the contents of the App at any time or for any reason at our sole discretion without notice.</p>
         
         <h3 className="text-gray-900 font-bold text-base">5. Governing Law</h3>
         <p>These Terms shall be governed by and defined following the laws of the State of California. FlowTracker and yourself irrevocably consent that the courts of California shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
      </div>
  );

  // --- Render Logic ---

  if (activeView === 'history') return <CycleHistoryView />;
  if (activeView === 'privacy') return <TextPageView title="Privacy Policy" content={PrivacyContent} />;
  if (activeView === 'terms') return <TextPageView title="Terms of Use" content={TermsContent} />;

  // Main Profile View
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
           <button 
              onClick={() => setActiveView('history')}
              className="w-full mt-4 flex items-center justify-between p-3 bg-teal-50 text-teal-700 rounded-xl font-medium text-sm hover:bg-teal-100 transition-colors"
           >
              <span>View full cycle history</span>
              <ChevronRight size={16} />
           </button>
        </div>

        {/* Support & Privacy */}
        <div className="bg-white rounded-2xl p-1 shadow-sm overflow-hidden">
           <button 
                onClick={() => setActiveView('privacy')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
            >
               <div className="flex items-center space-x-3">
                   <div className="p-2 bg-blue-50 rounded-lg">
                     <Shield size={18} className="text-blue-500" />
                   </div>
                   <span className="text-gray-700 font-medium text-sm">Privacy Policy</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
           </button>
           <button 
                onClick={() => setActiveView('terms')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
            >
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
