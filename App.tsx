import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Insights from './pages/Insights';
import CalendarPage from './pages/Calendar';
import BottomNav from './components/BottomNav';
import { AppRoute, UserSettings } from './types';
import { getUserSettings, saveUserSettings } from './services/db';

// Mock User Data as fallback
const DEFAULT_USER: UserSettings = {
  name: 'Guest',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days ago
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Data from Firebase
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      const remoteSettings = await getUserSettings();
      
      if (remoteSettings) {
        setUserSettings(remoteSettings);
      } else {
        // If no remote data (or error), we stick with default but try to save it to init the DB
        // This is optional: automatic onboarding
        // await saveUserSettings(DEFAULT_USER);
      }
      setIsLoading(false);
    };

    initData();
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home userSettings={userSettings} />;
      case AppRoute.PARTNERS:
        return <Partners userSettings={userSettings} />;
      case AppRoute.INSIGHTS:
        return <Insights userSettings={userSettings} />;
      case AppRoute.CALENDAR:
        return <CalendarPage userSettings={userSettings} />;
      case AppRoute.PROFILE:
        return (
           <div className="flex flex-col items-center justify-center h-full bg-white p-6">
             <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80" className="w-full h-full object-cover" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800">{userSettings.name}</h2>
             <button className="mt-6 bg-gray-100 px-6 py-3 rounded-xl w-full text-left font-semibold text-gray-700 hover:bg-gray-200 transition-colors">Settings</button>
             <button className="mt-3 bg-gray-100 px-6 py-3 rounded-xl w-full text-left font-semibold text-gray-700 hover:bg-gray-200 transition-colors">Reminders</button>
             <button className="mt-3 bg-rose-50 px-6 py-3 rounded-xl w-full text-left font-semibold text-rose-600 hover:bg-rose-100 transition-colors">Access Code</button>
             <div className="mt-auto text-xs text-gray-400 text-center pb-20">
               {isLoading ? "Syncing..." : "Data Synced with Firebase"}
             </div>
           </div>
        );
      default:
        return <Home userSettings={userSettings} />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-white relative overflow-hidden shadow-2xl sm:rounded-3xl sm:my-8 sm:h-[90vh] sm:border-8 sm:border-gray-800">
      {/* Dynamic Content Area */}
      <div className="h-full overflow-hidden">
        {renderPage()}
      </div>

      {/* Navigation */}
      <BottomNav currentRoute={currentRoute} setRoute={setCurrentRoute} />
    </div>
  );
};

export default App;