import React, { useState, useEffect } from 'react';
import CircularTracker from '../components/CircularTracker';
import DailyInsights from '../components/DailyInsights';
import SymptomLogger from '../components/SymptomLogger';
import { UserSettings, DailyLog } from '../types';
import { calculateDaysUntilPeriod, getCycleDay, getCalendarDayStatus } from '../services/cycleService';
import { logDailySymptoms, getDailyLog } from '../services/db';
import { Calendar as CalendarIcon } from 'lucide-react';

interface HomeProps {
  userSettings: UserSettings;
}

const Home: React.FC<HomeProps> = ({ userSettings }) => {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);

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
        onSave={handleSaveSymptoms}
      />
    </div>
  );
};

export default Home;