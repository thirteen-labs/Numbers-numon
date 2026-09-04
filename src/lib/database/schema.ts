export const DATABASE_NAME = 'numera.db';

export const CREATE_TABLES = `
  CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    middle_name TEXT DEFAULT '',
    last_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    nickname TEXT DEFAULT '',
    gender TEXT,
    birth_time TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    is_favorite INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    type TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS journal_entries (
    id TEXT PRIMARY KEY,
    profile_id TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    mood TEXT,
    tags TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    profile_id TEXT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    target_date TEXT,
    status TEXT DEFAULT 'active',
    progress INTEGER DEFAULT 0,
    favorable_number INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_reports_profile ON reports(profile_id);
  CREATE INDEX IF NOT EXISTS idx_journal_profile ON journal_entries(profile_id);
  CREATE INDEX IF NOT EXISTS idx_goals_profile ON goals(profile_id);
`;

export const DROP_TABLES = `
  DROP TABLE IF EXISTS goals;
  DROP TABLE IF EXISTS journal_entries;
  DROP TABLE IF EXISTS reports;
  DROP TABLE IF EXISTS profiles;
`;
