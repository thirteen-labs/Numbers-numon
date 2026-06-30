import { getDb } from './db';

export async function clearAllProfiles(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM profiles');
}

export async function clearAllEntries(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM journal_entries');
}

export async function clearAllGoals(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM goals');
}

export async function clearAllData(): Promise<void> {
  await clearAllGoals();
  await clearAllEntries();
  await clearAllProfiles();
}
