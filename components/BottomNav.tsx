import React from 'react';
import { Calendar, Heart, Home, BookOpen, User } from 'lucide-react';
import { AppRoute } from '../types';

interface BottomNavProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, setRoute }) => {
  const navItems = [
    { id: AppRoute.HOME, icon: Home, label: 'Today' },
    { id: AppRoute.CALENDAR, icon: Calendar, label: 'Calendar' },
    { id: AppRoute.PARTNERS, icon: Heart, label: 'Partners' },
    { id: AppRoute.INSIGHTS, icon: BookOpen, label: 'Insights' },
    { id: AppRoute.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-4 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setRoute(item.id)}
              className="flex flex-col items-center justify-center w-full py-2 group"
            >
              <item.icon 
                size={24} 
                className={`mb-1 transition-colors ${isActive ? 'text-rose-500 fill-rose-50' : 'text-gray-400 group-hover:text-gray-600'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-rose-500' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;