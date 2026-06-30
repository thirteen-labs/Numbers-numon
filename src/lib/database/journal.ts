import { getDb } from './db';

export interface JournalRow {
  id: string;
  profile_id: string | null;
  title: string;
  content: string;
  mood: string | null;
  tags: string;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  profileId: string | null;
  title: string;
  content: string;
  mood: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

function rowToEntry(row: JournalRow): JournalEntry {
  return {
    id: row.id,
    profileId: row.profile_id,
    title: row.title,
    content: row.content,
    mood: row.mood,
    tags: row.tags ? row.tags.split(',').filter(Boolean) : [],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function getAllEntries(profileId?: string): Promise<JournalEntry[]> {
  const db = await getDb();
  const rows = profileId
    ? await db.getAllAsync('SELECT * FROM journal_entries WHERE profile_id = ? ORDER BY created_at DESC', profileId)
    : await db.getAllAsync('SELECT * FROM journal_entries ORDER BY created_at DESC');
  return (rows as JournalRow[]).map(rowToEntry);
}

export async function getEntryById(id: string): Promise<JournalEntry | null> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT * FROM journal_entries WHERE id = ?', id) as JournalRow | null;
  return row ? rowToEntry(row) : null;
}

export async function insertEntry(entry: JournalEntry): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO journal_entries (id, profile_id, title, content, mood, tags, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    entry.id, entry.profileId, entry.title, entry.content, entry.mood, entry.tags.join(','),
    entry.createdAt.toISOString(), entry.updatedAt.toISOString()
  );
}

export async function updateEntry(id: string, entry: Partial<JournalEntry>): Promise<void> {
  const db = await getDb();
  const tags = entry.tags ? entry.tags.join(',') : undefined;
  await db.runAsync(
    `UPDATE journal_entries SET title = COALESCE(?, title), content = COALESCE(?, content),
     mood = COALESCE(?, mood), tags = COALESCE(?, tags), updated_at = ?
     WHERE id = ?`,
    entry.title ?? null, entry.content ?? null, entry.mood ?? null, tags ?? null,
    new Date().toISOString(), id
  );
}

export async function deleteEntry(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM journal_entries WHERE id = ?', id);
}

export async function searchEntries(query: string): Promise<JournalEntry[]> {
  const db = await getDb();
  const like = `%${query}%`;
  const rows = await db.getAllAsync(
    'SELECT * FROM journal_entries WHERE title LIKE ? OR content LIKE ? OR tags LIKE ? ORDER BY created_at DESC',
    like, like, like
  );
  return (rows as JournalRow[]).map(rowToEntry);
}
