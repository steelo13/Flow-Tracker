import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Sparkles, Circle } from 'lucide-react';
import { UserSettings } from '../types';
import { getCalendarDayStatus } from '../services/cycleService';

interface CalendarProps {
  userSettings: UserSettings;
}

const CalendarPage: React.FC<CalendarProps> = ({ userSettings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const totalSlots = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const grid = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDay + 1;
      
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
        const status = getCalendarDayStatus(dateToCheck, userSettings);
        const isToday = dateToCheck.getTime() === today.getTime();

        let bgClass = "bg-transparent";
        let textClass = "text-gray-700";
        let indicator = null;

        if (status === 'period') {
          bgClass = "bg-rose-100";
          textClass = "text-rose-600 font-bold";
          indicator = <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1"></div>;
        } else if (status === 'ovulation') {
          bgClass = "bg-teal-50 border-2 border-teal-200";
          textClass = "text-teal-700 font-bold";
          indicator = <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-1"></div>;
        } else if (status === 'fertile') {
          textClass = "text-teal-600";
          indicator = <div className="w-1 h-1 bg-teal-200 rounded-full mt-1"></div>;
        }

        if (isToday) {
            bgClass += " ring-2 ring-gray-800";
        }

        grid.push(
          <div key={i} className={`h-14 border border-gray-50 flex flex-col items-center justify-center relative ${bgClass}`}>
            {isToday && <span className="absolute top-1 left-1 w-2 h-2 bg-rose-500 rounded-full"></span>}
            <span className={`text-sm ${textClass}`}>{dayNumber}</span>
            {indicator}
          </div>
        );
      } else {
        grid.push(<div key={i} className="h-14 border border-gray-50 bg-gray-50/30" />);
      }
    }
    return grid;
  };

  return (
    <div className="flex flex-col h-full bg-white pb-24">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="text-gray-600" />
        </button>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-xs font-bold text-gray-400 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 overflow-y-auto">
        {renderCalendarGrid()}
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 mt-auto border-t border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Period</span>
          </div>
          <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-teal-400 rounded-full border-2 border-teal-100"></div>
             <span className="text-sm text-gray-600">Ovulation</span>
          </div>
          <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-teal-100 rounded-full"></div>
             <span className="text-sm text-gray-600">Fertile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;