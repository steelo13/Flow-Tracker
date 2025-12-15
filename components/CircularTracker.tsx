import React from 'react';
import { THEME_COLORS } from '../constants';
import { getCyclePhase } from '../services/cycleService';
import { UserSettings } from '../types';

interface CircularTrackerProps {
  daysUntilPeriod: number;
  currentDay: number;
  settings: UserSettings;
  onLogPeriod: () => void;
}

const CircularTracker: React.FC<CircularTrackerProps> = ({ 
  daysUntilPeriod, 
  currentDay, 
  settings, 
  onLogPeriod 
}) => {
  const phase = getCyclePhase(currentDay, settings.cycleLength, settings.periodLength);
  
  // SVG Config
  const size = 280;
  const strokeWidth = 20;
  const center = size / 2;
  const radius = center - strokeWidth - 10;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate progress based on cycle day
  const progress = Math.min(Math.max(currentDay / settings.cycleLength, 0), 1);
  const offset = circumference - progress * circumference;

  let mainColor = THEME_COLORS.period;
  let labelText = "Period in";
  let daysText = `${daysUntilPeriod} days`;
  
  if (daysUntilPeriod <= 0) {
    labelText = "Period is";
    daysText = Math.abs(daysUntilPeriod) === 0 ? "Due Today" : `${Math.abs(daysUntilPeriod)} days late`;
  } else if (phase === 'ovulation') {
    mainColor = THEME_COLORS.ovulation;
    labelText = "Ovulation";
    daysText = "Today";
  } else if (phase === 'luteal') {
    // Keep default period countdown
  } else if (phase === 'menstruation') {
    labelText = "Period day";
    daysText = `${currentDay}`;
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Progress Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={mainColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
            {labelText}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            {daysText}
          </h1>
          <button 
            onClick={onLogPeriod}
            className="mt-2 bg-rose-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-rose-200 active:scale-95 transition-transform"
          >
            Log period
          </button>
          <div className="mt-3 inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <span>FSA/HSA eligible</span>
          </div>
        </div>
        
        {/* Visual Decoration: Phase Dots (Simplified) */}
        <div className="absolute top-0 w-full h-full pointer-events-none">
           {/* Can add small dots around the ring to represent days if needed for advanced visual */}
        </div>
      </div>
    </div>
  );
};

export default CircularTracker;