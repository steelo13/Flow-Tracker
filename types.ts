
export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal';

export interface UserSettings {
  cycleLength: number; // Average cycle length (e.g., 28)
  periodLength: number; // Average period length (e.g., 5)
  lastPeriodStart: string; // ISO Date string
  name: string;
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

export enum AppRoute {
  HOME = 'home',
  CALENDAR = 'calendar',
  PARTNERS = 'partners',
  INSIGHTS = 'insights',
  PROFILE = 'profile'
}
