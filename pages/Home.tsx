import React, { useState, useEffect } from 'react';
import CircularTracker from '../components/CircularTracker';
import DailyInsights from '../components/DailyInsights';
import SymptomLogger from '../components/SymptomLogger';
import { UserSettings, DailyLog } from '../types';
import { calculateDaysUntilPeriod, getCycleDay, getCalendarDayStatus } from '../services/cycleService';
import { logDailySymptoms, getDailyLog } from '../services/db';
import { Calendar as CalendarIcon, Droplet, Moon, Minus, Plus } from 'lucide-react';

interface HomeProps {
  userSettings: UserSettings;
}

const Home: React.FC<HomeProps> = ({ userSettings }) => {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [waterCups, setWaterCups] = useState(4); // Default/Mock state for water

  // Pass selectedDate to recalculate the main wheel based on user selection
  const daysUntil = calculateDaysUntilPeriod(userSettings, selectedDate);
  const cycleDay = getCycleDay(userSettings, selectedDate);
  
  // Fetch daily log when date changes
  useEffect(() => {
    let isMounted = true;
    const fetchLog = async () => {
        const log = await getDailyLog(selectedDate.toISOString());
        if (isMounted) {
            setDailyLog(log);
        }
    };
    fetchLog();
    return () => { isMounted = false; };
  }, [selectedDate]);

  const handleSaveSymptoms = async (symptoms: string[]) => {
    // Use the selected date for logging instead of always 'now'
    const dateToLog = selectedDate.toISOString();
    await logDailySymptoms(dateToLog, symptoms);
    
    // Optimistic update
    setDailyLog({
        date: dateToLog,
        symptoms: symptoms
    });
    console.log(`Symptoms saved to database for ${dateToLog}:`, symptoms);
  };
  
  // Calculate pregnancy chance for insights
  const status = getCalendarDayStatus(selectedDate, userSettings);
  let pregnancyChance: 'Low' | 'Medium' | 'High' = 'Low';
  if (status === 'ovulation') pregnancyChance = 'High';
  else if (status === 'fertile') pregnancyChance = 'Medium';

  // Generate dates for the calendar strip (center around today to keep the strip stable)
  // We'll show a 1 week window: 3 days before, 3 days after to ensure unique weekdays
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i); 
    return d;
  });

  const isSelectedDateToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white pb-24 overflow-y-auto">
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
           <span className={`text-sm font-bold ${isSelectedDateToday ? 'text-gray-700' : 'text-purple-600'}`}>
             {isSelectedDateToday ? 'Today' : 'Selected'}
           </span>
           <span className="text-gray-300">|</span>
           <span className="text-sm text-gray-500">
             {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
           </span>
        </div>
        <button 
          onClick={() => setSelectedDate(new Date())}
          className="p-2 bg-white rounded-full shadow-sm active:bg-gray-100 transition-colors"
          title="Jump to Today"
        >
           <CalendarIcon size={20} className={isSelectedDateToday ? "text-gray-400" : "text-rose-500"} />
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="flex justify-between items-center px-4 py-4">
        {dates.map((date, idx) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          
          // Get real status from service
          const status = getCalendarDayStatus(date, userSettings);
          const isPeriod = status === 'period';
          const isOvulation = status === 'ovulation';
          const isFertile = status === 'fertile';

          return (
            <button 
              key={idx} 
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center space-y-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60'}`}
            >
              <span className={`text-xs font-medium ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
                {date.toLocaleDateString('en-US', { weekday: 'narrow' })}
              </span>
              
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all relative
                ${isSelected 
                    ? 'bg-gray-800 text-white scale-110 shadow-md ring-2 ring-offset-1 ring-gray-300' 
                    : isPeriod 
                      ? 'bg-rose-100 text-rose-500' 
                      : isOvulation
                        ? 'bg-teal-50 text-teal-600 border border-teal-200'
                        : 'bg-transparent text-gray-700'
                }
              `}>
                {date.getDate()}
                {/* Small indicator dots for status */}
                {!isSelected && isPeriod && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-rose-500"></div>}
                {!isSelected && isOvulation && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-teal-500"></div>}
                {!isSelected && isFertile && !isOvulation && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-teal-200"></div>}
              </div>
            </button>
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
      <DailyInsights 
        date={selectedDate}
        dailyLog={dailyLog}
        pregnancyChance={pregnancyChance}
        onLogClick={() => setIsLoggerOpen(true)}
      />

      {/* Health & Lifestyle Section (Replaces Promo) */}
      <div className="px-4 mb-6">
        <h3 className="text-gray-800 font-bold text-lg mb-3">Health & Lifestyle</h3>
        <div className="grid grid-cols-2 gap-3">
            {/* Water Card */}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Hydration</span>
                <div className="p-1 bg-blue-100 rounded-full">
                    <Droplet className="text-blue-500" size={14} fill="currentColor" />
                </div>
            </div>
            <div className="flex items-center justify-between mt-2">
                <button 
                    onClick={() => setWaterCups(Math.max(0, waterCups - 1))}
                    className="w-8 h-8 rounded-full bg-white text-blue-600 font-bold shadow-sm flex items-center justify-center active:scale-95 transition-transform"
                >
                    <Minus size={16} />
                </button>
                <div className="text-center">
                    <span className="text-2xl font-bold text-blue-900">{waterCups}</span>
                    <p className="text-[10px] text-blue-400 font-medium">cups</p>
                </div>
                <button 
                    onClick={() => setWaterCups(waterCups + 1)}
                    className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold shadow-sm flex items-center justify-center active:scale-95 transition-transform"
                >
                    <Plus size={16} />
                </button>
            </div>
            </div>

            {/* Sleep Card */}
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
                <span className="font-bold text-indigo-900 text-xs uppercase tracking-wider">Sleep</span>
                <div className="p-1 bg-indigo-100 rounded-full">
                    <Moon className="text-indigo-500" size={14} fill="currentColor" />
                </div>
            </div>
            <div className="z-10 mt-2">
                <span className="text-2xl font-bold text-indigo-900">7<span className="text-sm text-indigo-400">h</span> 30<span className="text-sm text-indigo-400">m</span></span>
                <div className="w-full bg-indigo-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-500 w-[85%] h-full rounded-full"></div>
                </div>
            </div>
            <span className="text-[10px] text-indigo-400 font-medium mt-1 z-10">Target: 8h</span>
            
            {/* Decorative */}
            <Moon className="absolute -bottom-4 -right-4 text-indigo-100 opacity-50" size={80} />
            </div>
        </div>
      </div>
      
      {/* Logger Modal */}
      <SymptomLogger 
        isOpen={isLoggerOpen} 
        onClose={() => setIsLoggerOpen(false)}
        onSave={handleSaveSymptoms}
      />
    </div>
  );
};

export default Home;