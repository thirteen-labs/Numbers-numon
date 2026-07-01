import { getDb } from './db';

export interface Report {
  id: string;
  profileId: string;
  type: string;
  data: string;
  createdAt: Date;
}

export async function getAllReports(): Promise<Report[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ id: string; profile_id: string; type: string; data: string; created_at: string }>(
    'SELECT * FROM reports ORDER BY created_at DESC'
  );
  return rows.map(mapRow);
}

export async function getReportsByProfile(profileId: string): Promise<Report[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ id: string; profile_id: string; type: string; data: string; created_at: string }>(
    'SELECT * FROM reports WHERE profile_id = ? ORDER BY created_at DESC',
    profileId
  );
  return rows.map(mapRow);
}

export async function getReportById(id: string): Promise<Report | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ id: string; profile_id: string; type: string; data: string; created_at: string }>(
    'SELECT * FROM reports WHERE id = ?',
    id
  );
  return row ? mapRow(row) : null;
}

export async function insertReport(report: Report): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT INTO reports (id, profile_id, type, data, created_at) VALUES (?, ?, ?, ?, ?)',
    report.id,
    report.profileId,
    report.type,
    report.data,
    report.createdAt.toISOString()
  );
}

export async function deleteReport(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM reports WHERE id = ?', id);
}

export async function clearAllReports(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM reports');
}

function mapRow(row: { id: string; profile_id: string; type: string; data: string; created_at: string }): Report {
  return {
    id: row.id,
    profileId: row.profile_id,
    type: row.type,
    data: row.data,
    createdAt: new Date(row.created_at),
  };
}
