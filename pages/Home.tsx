import React, { useState } from 'react';
import CircularTracker from '../components/CircularTracker';
import DailyInsights from '../components/DailyInsights';
import SymptomLogger from '../components/SymptomLogger';
import { UserSettings } from '../types';
import { calculateDaysUntilPeriod, getCycleDay } from '../services/cycleService';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

interface HomeProps {
  userSettings: UserSettings;
}

const Home: React.FC<HomeProps> = ({ userSettings }) => {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const daysUntil = calculateDaysUntilPeriod(userSettings);
  const cycleDay = getCycleDay(userSettings);
  
  // Simulated dates for the calendar strip
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white pb-24">
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
           <span className="text-sm font-bold text-gray-700">Today</span>
           <span className="text-gray-300">|</span>
           <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm">
           <CalendarIcon size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="flex justify-between px-4 py-4">
        {dates.map((date, idx) => {
          const isToday = idx === 3;
          const isPeriod = idx > 4; // Mock logic
          return (
            <div key={idx} className={`flex flex-col items-center space-y-1 ${isToday ? 'opacity-100' : 'opacity-60'}`}>
              <span className="text-xs text-gray-500 font-medium">{date.toLocaleDateString('en-US', { weekday: 'narrow' })}</span>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                ${isToday ? 'bg-gray-800 text-white' : isPeriod ? 'bg-rose-100 text-rose-500' : 'bg-transparent text-gray-700'}
              `}>
                {date.getDate()}
              </div>
              {isPeriod && <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>}
            </div>
          );
        })}
      </div>

      {/* Main Wheel */}
      <CircularTracker 
        daysUntilPeriod={daysUntil} 
        currentDay={cycleDay} 
        settings={userSettings}
        onLogPeriod={() => setIsLoggerOpen(true)}
      />

      {/* Insights Section */}
      <DailyInsights />

      {/* Promo Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="font-bold text-lg mb-1">Flo Premium</h3>
             <p className="text-xs text-purple-100 mb-3 max-w-[80%]">Get personalized health reports and unlimited access to video courses.</p>
             <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-full">
               Try for free
             </button>
           </div>
           <div className="absolute right-[-20px] top-[-20px] opacity-20">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
           </div>
        </div>
      </div>
      
      {/* Logger Modal */}
      <SymptomLogger 
        isOpen={isLoggerOpen} 
        onClose={() => setIsLoggerOpen(false)}
        onSave={(symptoms) => console.log('Saved', symptoms)}
      />
    </div>
  );
};

export default Home;