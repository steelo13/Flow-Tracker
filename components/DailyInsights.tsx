
import React from 'react';
import { Droplets, Plus, Info, Baby } from 'lucide-react';
import { DailyLog } from '../types';
import { MOCK_SYMPTOMS } from '../constants';

interface DailyInsightsProps {
  date: Date;
  dailyLog: DailyLog | null;
  pregnancyChance: 'High' | 'Medium' | 'Low';
  onLogClick: () => void;
  isPregnancyMode?: boolean;
  onPregnancyClick?: () => void;
}

const DailyInsights: React.FC<DailyInsightsProps> = ({ 
  date, 
  dailyLog, 
  pregnancyChance, 
  onLogClick,
  isPregnancyMode,
  onPregnancyClick
}) => {
  // Filter symptoms from log
  const loggedSymptomIds = dailyLog?.symptoms || [];
  const loggedSymptomsData = loggedSymptomIds.map(id => MOCK_SYMPTOMS.find(s => s.id === id)).filter(Boolean);
  
  const dischargeSymptom = loggedSymptomsData.find(s => s?.category === 'discharge');
  
  // Determine chance style
  let chanceStyle = {
      color: "text-gray-400",
      bg: "bg-gray-100",
      barColor: "bg-gray-300",
      barWidth: "w-1/4",
      label: "Low Chance"
  };
  
  let displayText: string = pregnancyChance;

  if (isPregnancyMode) {
      chanceStyle = {
          color: "text-amber-600",
          bg: "bg-amber-50",
          barColor: "bg-amber-500",
          barWidth: "w-full",
          label: "Tracking"
      };
      displayText = "Pregnant";
  } else if (pregnancyChance === 'High') {
      chanceStyle = {
          color: "text-teal-600",
          bg: "bg-teal-50",
          barColor: "bg-teal-500",
          barWidth: "w-full",
          label: "Peak Fertility"
      };
  } else if (pregnancyChance === 'Medium') {
      chanceStyle = {
          color: "text-teal-500",
          bg: "bg-teal-50",
          barColor: "bg-teal-400",
          barWidth: "w-1/2",
          label: "High Chance"
      };
  } else {
      // Low
      chanceStyle = {
          color: "text-rose-400",
          bg: "bg-rose-50",
          barColor: "bg-rose-300",
          barWidth: "w-1/5",
          label: "Low Chance"
      };
  }

  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div className="w-full px-4 mb-6">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-gray-800 font-bold text-lg">My daily insights • {isToday ? 'Today' : 'Selected'}</h3>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
        {/* Card 1: Symptoms */}
        <div 
            onClick={onLogClick}
            className="flex-shrink-0 w-32 h-32 bg-purple-50 rounded-2xl p-3 flex flex-col justify-between border border-purple-100 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <span className="text-purple-900 font-bold text-xs">Symptoms</span>
          
          <div className="flex -space-x-2 overflow-hidden pl-1 h-8 items-center">
             {loggedSymptomsData.length > 0 ? (
                 loggedSymptomsData.slice(0, 3).map((s, i) => (
                    <div key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-white flex items-center justify-center shadow-sm" title={s?.name}>
                         <span className="text-[10px] font-bold text-purple-600 capitalize">{s?.name[0]}</span>
                    </div>
                 ))
             ) : (
                <div className="text-gray-400 text-[10px] italic leading-tight">No symptoms logged</div>
             )}
             {loggedSymptomsData.length > 3 && (
                 <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-purple-200 flex items-center justify-center text-[8px] font-bold text-purple-800">
                     +{loggedSymptomsData.length - 3}
                 </div>
             )}
          </div>
          
          <div className="flex items-center space-x-1 text-[10px] text-purple-700 font-bold uppercase tracking-wide">
            {loggedSymptomsData.length === 0 ? <Plus size={10} /> : null}
            <span>{loggedSymptomsData.length === 0 ? "Log symptoms" : "Edit Log"}</span>
          </div>
        </div>

        {/* Card 2: Discharge */}
        <div className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl p-3 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden">
          <span className="text-gray-800 font-bold text-xs">Discharge</span>
          <div className="absolute bottom-[-10px] right-[-10px] opacity-10">
             <Droplets size={80} className="text-blue-500" />
          </div>
          <div className="z-10 mt-auto">
             <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Droplets size={14} className="text-blue-500" />
                </div>
                <span className="font-bold text-gray-700 text-xs truncate">
                    {dischargeSymptom ? dischargeSymptom.name : "None"}
                </span>
             </div>
          </div>
        </div>

        {/* Card 3: Pregnancy Chance / Mode */}
        <div 
            onClick={onPregnancyClick}
            className={`flex-shrink-0 w-32 h-32 ${chanceStyle.bg} rounded-2xl p-3 flex flex-col justify-between border border-transparent shadow-sm relative overflow-hidden cursor-pointer active:scale-95 transition-transform`}
            title="Toggle Pregnancy Mode"
        >
          <div className="flex justify-between items-start z-10">
             <span className={`${chanceStyle.color} font-bold text-xs leading-tight opacity-80`}>Pregnancy</span>
             {isPregnancyMode ? <Baby size={14} className={chanceStyle.color} /> : <Info size={12} className={chanceStyle.color} />}
          </div>
          
          <div className="flex flex-col items-center justify-center z-10 flex-1">
             <span className={`text-lg font-extrabold ${chanceStyle.color}`}>{displayText}</span>
             <span className={`text-[10px] font-medium ${chanceStyle.color} opacity-75`}>{chanceStyle.label}</span>
          </div>
          
          <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden z-10">
            <div className={`h-full ${chanceStyle.barColor} ${chanceStyle.barWidth} transition-all duration-500`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInsights;
