
export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal';

export interface UserSettings {
  cycleLength: number; // Average cycle length (e.g., 28)
  periodLength: number; // Average period length (e.g., 5)
  lastPeriodStart: string; // ISO Date string
  name: string;
  completedLessons?: string[]; // IDs of completed lessons
  profileImage?: string; // Base64 or URL
  reminders?: {
    periodStart: boolean;
    fertileWindow: boolean;
    logSymptoms: boolean;
  };
  pregnancyMode?: boolean;
  waterGoal?: number;
  sleepGoal?: number;
}

export interface Symptom {
  id: string;
  name: string;
  icon: string; // Icon identifier
  category: 'physical' | 'mood' | 'discharge' | 'other';
}

export interface DailyLog {
  date: string;
  symptoms: string[]; // IDs of symptoms
  mood?: string;
  flow?: 'light' | 'medium' | 'heavy' | 'spotting';
  notes?: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  readTime: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  lessons: Lesson[];
}

export enum AppRoute {
  HOME = 'home',
  CALENDAR = 'calendar',
  PARTNERS = 'partners',
  INSIGHTS = 'insights',
  PROFILE = 'profile'
}
