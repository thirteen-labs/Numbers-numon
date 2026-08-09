import { getDb } from './db';
import type { Profile } from '@/lib/schema';

function safeParseDate(value: string | null | undefined): Date {
	if (!value) return new Date();
	const parsed = new Date(value);
	return isNaN(parsed.getTime()) ? new Date() : parsed;
}

function rowToProfile(row: any): Profile {
  return {
    id: row.id,
    name: row.name,
    person: {
      firstName: row.first_name,
      middleName: row.middle_name ?? '',
      lastName: row.last_name,
      dateOfBirth: safeParseDate(row.date_of_birth),
      nickname: row.nickname ?? '',
      gender: row.gender ?? undefined,
      birthTime: row.birth_time ?? '',
      notes: row.notes ?? '',
    },
    isFavorite: !!row.is_favorite,
    createdAt: safeParseDate(row.created_at),
    updatedAt: safeParseDate(row.updated_at),
  };
}

export async function getAllProfiles(): Promise<Profile[]> {
  const db = await getDb();
  const rows = await db.getAllAsync(
    'SELECT * FROM profiles ORDER BY is_favorite DESC, updated_at DESC'
  );
  return rows.map(rowToProfile);
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT * FROM profiles WHERE id = ?', id);
  return row ? rowToProfile(row) : null;
}

export async function insertProfile(profile: Profile): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO profiles (id, name, first_name, middle_name, last_name, date_of_birth, nickname, gender, birth_time, notes, is_favorite, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    profile.id,
    profile.name,
    profile.person.firstName,
    profile.person.middleName ?? '',
    profile.person.lastName,
    profile.person.dateOfBirth.toISOString(),
    profile.person.nickname ?? '',
    profile.person.gender ?? null,
    profile.person.birthTime ?? '',
    profile.person.notes ?? '',
    profile.isFavorite ? 1 : 0,
    profile.createdAt.toISOString(),
    profile.updatedAt.toISOString()
  );
}

export async function updateProfile(id: string, profile: Profile): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE profiles SET name = ?, first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, nickname = ?, gender = ?, birth_time = ?, notes = ?, is_favorite = ?, updated_at = ?
     WHERE id = ?`,
    profile.name,
    profile.person.firstName,
    profile.person.middleName ?? '',
    profile.person.lastName,
    profile.person.dateOfBirth.toISOString(),
    profile.person.nickname ?? '',
    profile.person.gender ?? null,
    profile.person.birthTime ?? '',
    profile.person.notes ?? '',
    profile.isFavorite ? 1 : 0,
    new Date().toISOString(),
    id
  );
}

export async function deleteProfile(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM profiles WHERE id = ?', id);
}

export async function toggleFavorite(id: string, isFavorite: boolean): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'UPDATE profiles SET is_favorite = ?, updated_at = ? WHERE id = ?',
    isFavorite ? 1 : 0,
    new Date().toISOString(),
    id
  );
}

export async function getProfileCount(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT COUNT(*) as count FROM profiles') as { count: number };
  return row.count;
}
