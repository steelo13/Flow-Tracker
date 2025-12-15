import React from 'react';
import { UserSettings } from '../types';
import { Heart, MessageCircle, Info } from 'lucide-react';

interface PartnersProps {
  userSettings: UserSettings;
}

const Partners: React.FC<PartnersProps> = ({ userSettings }) => {
  return (
    <div className="flex flex-col h-full bg-purple-50 pb-24 overflow-y-auto">
       {/* Header */}
       <div className="bg-white p-6 rounded-b-3xl shadow-sm mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-rose-100 p-2 rounded-full">
              <Heart className="text-rose-500" size={24} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Flo for Partners</h1>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sharing your cycle helps your partner understand your moods and symptoms. Maximize your connection today.
          </p>
       </div>

       {/* Main Interaction Card */}
       <div className="px-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
             <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Sync</span>
               <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">Connected</span>
             </div>
             
             <div className="flex space-x-4">
                <div className="flex-1">
                   <img 
                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80" 
                     className="w-16 h-16 rounded-full border-4 border-rose-100 mx-auto mb-2 object-cover" 
                     alt="Her" 
                   />
                   <p className="text-center font-bold text-gray-800">Her Day</p>
                   <p className="text-center text-xs text-gray-500">Day {22} of cycle</p>
                   <div className="mt-2 text-center">
                     <span className="inline-block bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded font-medium">Cramps</span>
                   </div>
                </div>
                
                <div className="flex items-center justify-center">
                   <div className="w-px h-24 bg-gray-200"></div>
                </div>

                <div className="flex-1">
                   <img 
                     src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" 
                     className="w-16 h-16 rounded-full border-4 border-blue-100 mx-auto mb-2 object-cover" 
                     alt="Him" 
                   />
                   <p className="text-center font-bold text-gray-800">His Role</p>
                   <p className="text-center text-xs text-gray-500">Supportive</p>
                   <div className="mt-2 text-center">
                     <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded font-medium">Send tea</span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Daily Tip */}
       <div className="px-4 mb-6">
         <div className="bg-white p-4 rounded-2xl shadow-sm flex items-start space-x-4 border-l-4 border-orange-400">
            <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
               <MessageCircle size={20} className="text-orange-500" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">Daily conversation starter</h4>
              <p className="text-sm text-gray-600">"How can I make your evening more relaxing today?"</p>
              <button className="mt-3 text-xs font-bold text-orange-500 uppercase">See Answer</button>
            </div>
         </div>
       </div>

       {/* Education */}
       <div className="px-4">
         <div className="bg-indigo-900 rounded-2xl p-5 text-white">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-lg mb-2">Why does mood change?</h3>
                  <p className="text-indigo-200 text-sm mb-4">Progesterone drops dramatically before the period starts.</p>
                  <button className="bg-white text-indigo-900 px-4 py-2 rounded-full text-xs font-bold">Watch Video</button>
               </div>
               <Info className="text-indigo-400" />
            </div>
         </div>
       </div>
    </div>
  );
};

export default Partners;