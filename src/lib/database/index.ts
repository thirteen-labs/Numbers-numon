export { DATABASE_NAME, CREATE_TABLES, DROP_TABLES } from './schema';
export { getDb, closeDb } from './db';
export {
  getAllProfiles, getProfileById, insertProfile,
  updateProfile, deleteProfile, toggleFavorite, getProfileCount,
} from './profiles';
export {
  getAllEntries, getEntryById, insertEntry,
  updateEntry, deleteEntry, searchEntries,
} from './journal';
export type { JournalEntry } from './journal';
export {
  getAllGoals, getGoalById, insertGoal,
  updateGoal, deleteGoal,
} from './goals';
export type { Goal } from './goals';
export { clearAllProfiles, clearAllEntries, clearAllGoals, clearAllData } from './clear';
