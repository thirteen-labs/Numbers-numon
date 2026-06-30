import { getDb } from './db';

export interface GoalRow {
  id: string;
  profile_id: string | null;
  title: string;
  description: string;
  target_date: string | null;
  status: string;
  progress: number;
  favorable_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  profileId: string | null;
  title: string;
  description: string;
  targetDate: Date | null;
  status: 'active' | 'completed' | 'cancelled';
  progress: number;
  favorableNumber: number | null;
  createdAt: Date;
  updatedAt: Date;
}

function rowToGoal(row: GoalRow): Goal {
  return {
    id: row.id,
    profileId: row.profile_id,
    title: row.title,
    description: row.description,
    targetDate: row.target_date ? new Date(row.target_date) : null,
    status: row.status as Goal['status'],
    progress: row.progress,
    favorableNumber: row.favorable_number,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function getAllGoals(profileId?: string): Promise<Goal[]> {
  const db = await getDb();
  const rows = profileId
    ? await db.getAllAsync('SELECT * FROM goals WHERE profile_id = ? ORDER BY created_at DESC', profileId)
    : await db.getAllAsync('SELECT * FROM goals ORDER BY status ASC, created_at DESC');
  return (rows as GoalRow[]).map(rowToGoal);
}

export async function getGoalById(id: string): Promise<Goal | null> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT * FROM goals WHERE id = ?', id) as GoalRow | null;
  return row ? rowToGoal(row) : null;
}

export async function insertGoal(goal: Goal): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO goals (id, profile_id, title, description, target_date, status, progress, favorable_number, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    goal.id, goal.profileId, goal.title, goal.description,
    goal.targetDate?.toISOString() ?? null, goal.status, goal.progress,
    goal.favorableNumber, goal.createdAt.toISOString(), goal.updatedAt.toISOString()
  );
}

export async function updateGoal(id: string, goal: Partial<Goal>): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `UPDATE goals SET title = COALESCE(?, title), description = COALESCE(?, description),
     target_date = COALESCE(?, target_date), status = COALESCE(?, status),
     progress = COALESCE(?, progress), favorable_number = COALESCE(?, favorable_number), updated_at = ?
     WHERE id = ?`,
    goal.title ?? null, goal.description ?? null,
    goal.targetDate?.toISOString() ?? null, goal.status ?? null,
    goal.progress ?? null, goal.favorableNumber ?? null,
    new Date().toISOString(), id
  );
}

export async function deleteGoal(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM goals WHERE id = ?', id);
}
