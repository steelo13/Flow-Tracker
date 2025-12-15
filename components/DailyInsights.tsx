import React from 'react';
import {  Droplets, Smile, Thermometer } from 'lucide-react';

const DailyInsights = () => {
  return (
    <div className="w-full px-4 mb-6">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-gray-800 font-bold text-lg">My daily insights • Today</h3>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
        {/* Card 1: Symptoms */}
        <div className="flex-shrink-0 w-32 h-32 bg-purple-50 rounded-2xl p-3 flex flex-col justify-between border border-purple-100 shadow-sm">
          <span className="text-purple-900 font-bold text-xs">Symptoms</span>
          <div className="flex -space-x-2 overflow-hidden pl-1">
             {/* Mock avatars/icons representing logged data */}
             <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-orange-200 flex items-center justify-center">
               <Smile size={14} className="text-orange-600"/>
             </div>
             <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-blue-200 flex items-center justify-center">
                <Thermometer size={14} className="text-blue-600"/>
             </div>
          </div>
          <div className="text-[10px] text-purple-700 font-bold uppercase tracking-wide">+ Log more</div>
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
                <span className="font-bold text-gray-700 text-xs">Sticky</span>
             </div>
          </div>
        </div>

        {/* Card 3: Pregnancy Chance */}
        <div className="flex-shrink-0 w-32 h-32 bg-pink-50 rounded-2xl p-3 flex flex-col justify-between border border-pink-100 shadow-sm">
          <span className="text-pink-900 font-bold text-xs leading-tight">Pregnancy chance</span>
          <div className="flex items-center justify-center">
             <span className="text-xl font-bold text-pink-500">Low</span>
          </div>
          <div className="w-full bg-pink-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInsights;