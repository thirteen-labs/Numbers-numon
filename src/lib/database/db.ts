import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME, CREATE_TABLES } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.execAsync(CREATE_TABLES);
  }
  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
