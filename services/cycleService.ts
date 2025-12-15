import { UserSettings, CyclePhase } from '../types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateDaysUntilPeriod = (settings: UserSettings): number => {
  const lastStart = new Date(settings.lastPeriodStart).getTime();
  const today = new Date().getTime();
  
  // Simple calculation: Last start + cycle length - days elapsed
  const nextStart = lastStart + (settings.cycleLength * MS_PER_DAY);
  const diffTime = nextStart - today;
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);
  
  return diffDays; // Can be negative if period is late
};

export const getCycleDay = (settings: UserSettings): number => {
  const lastStart = new Date(settings.lastPeriodStart).getTime();
  const today = new Date().getTime();
  const diffTime = today - lastStart;
  const dayOfCycle = Math.floor(diffTime / MS_PER_DAY) + 1;
  return dayOfCycle;
};

export const getCyclePhase = (dayOfCycle: number, cycleLength: number, periodLength: number): CyclePhase => {
  if (dayOfCycle <= periodLength) return 'menstruation';
  // Ovulation typically happens 14 days before the end of the cycle
  const ovulationDay = cycleLength - 14;
  
  if (dayOfCycle >= ovulationDay - 1 && dayOfCycle <= ovulationDay + 1) return 'ovulation';
  if (dayOfCycle < ovulationDay - 1) return 'follicular';
  return 'luteal';
};

export const isFertileWindow = (dayOfCycle: number, cycleLength: number): boolean => {
  const ovulationDay = cycleLength - 14;
  return dayOfCycle >= ovulationDay - 5 && dayOfCycle <= ovulationDay + 1;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

export const getCalendarDayStatus = (date: Date, settings: UserSettings): 'period' | 'ovulation' | 'fertile' | null => {
  // Normalize dates to midnight to avoid time discrepancies
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  const lastStart = new Date(settings.lastPeriodStart);
  lastStart.setHours(0, 0, 0, 0);

  const diffTime = checkDate.getTime() - lastStart.getTime();
  const diffDays = Math.round(diffTime / MS_PER_DAY);

  // Calculate 1-based cycle day, handling negative days (past cycles)
  let dayOfCycle = (diffDays % settings.cycleLength) + 1;
  if (dayOfCycle <= 0) dayOfCycle += settings.cycleLength;

  // Period
  if (dayOfCycle <= settings.periodLength) return 'period';

  // Ovulation & Fertile Window
  const ovulationDay = settings.cycleLength - 14;
  if (dayOfCycle === ovulationDay) return 'ovulation';
  
  if (dayOfCycle >= ovulationDay - 5 && dayOfCycle <= ovulationDay + 1) return 'fertile';

  return null;
};