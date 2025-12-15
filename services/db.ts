import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { UserSettings, DailyLog } from '../types';

// In a real app with Auth, this would be the actual User ID.
// For this demo, we use a static ID to simulate a specific user's data.
const USER_ID = 'demo_user_001';

export const getUserSettings = async (): Promise<UserSettings | null> => {
  if (!db) {
    console.warn("Firestore not initialized. Using default/local data.");
    return null;
  }
  try {
    const docRef = doc(db, 'users', USER_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserSettings;
    }
    return null;
  } catch (error) {
    console.error("Error connecting to Firebase (Check config in services/firebase.ts):", error);
    return null;
  }
};

export const saveUserSettings = async (settings: UserSettings): Promise<void> => {
  if (!db) return;
  try {
    const docRef = doc(db, 'users', USER_ID);
    await setDoc(docRef, settings, { merge: true });
    console.log("Settings saved to Firebase");
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

export const logDailySymptoms = async (date: string, symptoms: string[]): Promise<void> => {
  if (!db) return;
  try {
    // We store logs in a subcollection 'logs' under the user document
    // Document ID is the ISO date string (YYYY-MM-DD) for simplicity
    const logId = date.split('T')[0]; 
    const logRef = doc(db, 'users', USER_ID, 'logs', logId);

    const logEntry: DailyLog = {
      date: date,
      symptoms: symptoms,
      // Default fields
      flow: 'medium'
    };

    // Use setDoc with merge: true to update if exists, create if not
    await setDoc(logRef, logEntry, { merge: true });
    console.log("Symptoms logged to Firebase");
  } catch (error) {
    console.error("Failed to log symptoms:", error);
  }
};