import { Symptom, InsightArticle } from './types';

export const THEME_COLORS = {
  primary: '#ff5c8d', // Flo Pink
  primaryLight: '#ffe4ea',
  secondary: '#6b4c9a', // Deep Purple
  bg: '#f8f4fc',
  period: '#ff5c8d',
  ovulation: '#3cdbc0', // Teal
  fertile: '#b2f2e8',
};

export const MOCK_SYMPTOMS: Symptom[] = [
  { id: 'cramps', name: 'Cramps', icon: 'zap', category: 'physical' },
  { id: 'headache', name: 'Headache', icon: 'frown', category: 'physical' },
  { id: 'bloating', name: 'Bloating', icon: 'wind', category: 'physical' },
  { id: 'acne', name: 'Acne', icon: 'meh', category: 'physical' },
  { id: 'happy', name: 'Happy', icon: 'smile', category: 'mood' },
  { id: 'sad', name: 'Sad', icon: 'frown', category: 'mood' },
  { id: 'mood_swings', name: 'Mood Swings', icon: 'refresh-cw', category: 'mood' },
  { id: 'fatigue', name: 'Fatigue', icon: 'battery-low', category: 'physical' },
  { id: 'egg_white', name: 'Egg white', icon: 'droplet', category: 'discharge' },
  { id: 'sticky', name: 'Sticky', icon: 'cloud', category: 'discharge' },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: '1',
    title: 'Why do I crave chocolate before my period?',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'Understanding your fertile window',
    category: 'Fertility',
    imageUrl: 'https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: '5 Yoga poses for cramp relief',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '4 min read'
  }
];