
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Insights from './pages/Insights';
import CalendarPage from './pages/Calendar';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
import { AppRoute, UserSettings } from './types';
import { getUserSettings, saveUserSettings } from './services/db';

// Mock User Data as fallback
const DEFAULT_USER: UserSettings = {
  name: 'Guest',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days ago
  completedLessons: [],
  reminders: {
    periodStart: true,
    fertileWindow: true,
    logSymptoms: false
  },
  pregnancyMode: false,
  waterGoal: 8,
  sleepGoal: 8
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

  const handleUpdateSettings = async (newSettings: Partial<UserSettings>) => {
    const updated = { ...userSettings, ...newSettings };
    setUserSettings(updated);
    await saveUserSettings(updated);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Clear local storage items used by the app
      localStorage.removeItem('partner_her_photo');
      localStorage.removeItem('partner_his_photo');
      localStorage.removeItem('partner_checklist_checks');
      
      // Reload the page to reset all state
      window.location.reload();
    }
  };

  const renderPage = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home userSettings={userSettings} onUpdateSettings={handleUpdateSettings} />;
      case AppRoute.PARTNERS:
        return <Partners userSettings={userSettings} />;
      case AppRoute.INSIGHTS:
        return <Insights userSettings={userSettings} onUpdateSettings={handleUpdateSettings} />;
      case AppRoute.CALENDAR:
        return <CalendarPage userSettings={userSettings} />;
      case AppRoute.PROFILE:
        return <Profile userSettings={userSettings} onUpdateSettings={handleUpdateSettings} onLogout={handleLogout} />;
      default:
        return <Home userSettings={userSettings} onUpdateSettings={handleUpdateSettings} />;
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
