import { UserSettings, CyclePhase } from '../types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateDaysUntilPeriod = (settings: UserSettings, referenceDate: Date = new Date()): number => {
  const lastStart = new Date(settings.lastPeriodStart);
  lastStart.setHours(0,0,0,0);
  
  const ref = new Date(referenceDate);
  ref.setHours(0,0,0,0);
  
  const cycleLength = settings.cycleLength;
  const expectedNext = new Date(lastStart.getTime() + cycleLength * MS_PER_DAY);

  // Check if we are in a "Late" scenario:
  // The reference date is past the expected period, AND it is not in the future (relative to real time).
  // If we select a future date, we want the prediction (positive days), not "late".
  const isOverdue = ref.getTime() >= expectedNext.getTime();
  const isFuture = ref.getTime() > new Date().getTime();

  if (isOverdue && !isFuture) {
     // Return negative number indicating days late
     const diffTime = expectedNext.getTime() - ref.getTime();
     return Math.ceil(diffTime / MS_PER_DAY);
  }

  // Otherwise (Future prediction OR Past historical view OR Current normal cycle), 
  // assume cycles proceeded normally using modular arithmetic.
  const diffTime = ref.getTime() - lastStart.getTime();
  const diffDays = Math.floor(diffTime / MS_PER_DAY);
  
  let daysIntoCycle = diffDays % cycleLength;
  if (daysIntoCycle < 0) daysIntoCycle += cycleLength;
  
  return cycleLength - daysIntoCycle;
};

export const getCycleDay = (settings: UserSettings, referenceDate: Date = new Date()): number => {
  const lastStart = new Date(settings.lastPeriodStart);
  lastStart.setHours(0,0,0,0);
  
  const ref = new Date(referenceDate);
  ref.setHours(0,0,0,0);
  
  const diffTime = ref.getTime() - lastStart.getTime();
  const diffDays = Math.floor(diffTime / MS_PER_DAY);

  // Use modulo to find the day within the theoretical cycle for that date
  let dayOfCycle = (diffDays % settings.cycleLength); // 0-based result
  if (dayOfCycle < 0) dayOfCycle += settings.cycleLength;
  
  return dayOfCycle + 1; // Return 1-based index (Day 1..28)
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