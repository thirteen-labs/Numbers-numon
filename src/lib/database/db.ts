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
			try { await database.execAsync('PRAGMA journal_mode = WAL;'); } catch {}
			try { await database.execAsync(CREATE_TABLES); } catch (e) { console.warn('[DB] CREATE_TABLES failed, retry individual', e); }
			try { await database.execAsync('PRAGMA foreign_keys = ON;'); } catch {}
			db = database;
			return database;
		} catch (e) {
			initPromise = null;
			throw e;
		}
	})();

	try {
		return await initPromise;
	} catch (e) {
		initPromise = null;
		throw e;
	}
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
	initPromise = null;
}

export async function withTimeout<T>(promise: Promise<T>, ms = 8000, label = 'DB operation'): Promise<T> {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	const timeoutPromise = new Promise<never>((_, reject) => {
		timeout = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
	});
	try {
		const result = await Promise.race([promise, timeoutPromise]);
		return result as T;
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
