import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Insights from './pages/Insights';
import CalendarPage from './pages/Calendar';
import BottomNav from './components/BottomNav';
import { AppRoute, UserSettings } from './types';

// Mock User Data - In a real app, this would come from Firebase
const DEFAULT_USER: UserSettings = {
  name: 'Guest',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days ago
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_USER);

  // Initialize Firebase Connection here
  useEffect(() => {
    // const initFirebase = async () => { ... }
    console.log("FloTracker initialized. Ready for Firebase config.");
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home userSettings={userSettings} />;
      case AppRoute.PARTNERS:
        return <Partners userSettings={userSettings} />;
      case AppRoute.INSIGHTS:
        return <Insights />;
      case AppRoute.CALENDAR:
        return <CalendarPage userSettings={userSettings} />;
      case AppRoute.PROFILE:
        return (
           <div className="flex flex-col items-center justify-center h-full bg-white p-6">
             <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <img src="https://picsum.photos/200/200?random=50" className="w-full h-full object-cover" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800">{userSettings.name}</h2>
             <button className="mt-6 bg-gray-100 px-6 py-3 rounded-xl w-full text-left font-semibold text-gray-700">Settings</button>
             <button className="mt-3 bg-gray-100 px-6 py-3 rounded-xl w-full text-left font-semibold text-gray-700">Reminders</button>
             <button className="mt-3 bg-rose-50 px-6 py-3 rounded-xl w-full text-left font-semibold text-rose-600">Access Code</button>
           </div>
        );
      default:
        return <Home userSettings={userSettings} />;
    }
  };

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