import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME, CREATE_TABLES } from './schema';

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
	if (db) return db;
	if (initPromise) return initPromise;

	initPromise = (async () => {
		try {
			const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
			await database.execAsync(CREATE_TABLES);
			db = database;
			return database;
		} catch (e) {
			initPromise = null;
			throw e;
		}
	})();

	return initPromise;
}

export async function closeDb(): Promise<void> {
	if (db) {
		try {
			await db.closeAsync();
		} catch (e) {
			console.error('Failed to close database', e);
		}
		db = null;
	}
}
