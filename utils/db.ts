import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_PATH = process.env.HEALING_DB_PATH || './healing/locatorStore.db';

let dbInstance: Database | null = null;

/**
 * Opens (or creates) the locator healing database and ensures the
 * locator_history table exists. Called once per process via getDb().
 */
export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS locator_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      old_locator TEXT NOT NULL,
      new_locator TEXT NOT NULL,
      confidence REAL NOT NULL,
      reason TEXT,
      timestamp TEXT NOT NULL
    );
  `);

  return dbInstance;
}

/** Persist a healed locator so future runs use the new one directly (Module 4). */
export async function saveHealedLocator(params: {
  page: string;
  oldLocator: string;
  newLocator: string;
  confidence: number;
  reason: string;
}): Promise<void> {
  const db = await getDb();
  await db.run(
    `INSERT INTO locator_history (page, old_locator, new_locator, confidence, reason, timestamp)
     VALUES (?, ?, ?, ?, ?, ?)`,
    params.page,
    params.oldLocator,
    params.newLocator,
    params.confidence,
    params.reason,
    new Date().toISOString()
  );
}

/** Look up the most recent healed replacement for a given page + old locator, if any. */
export async function getLatestHealedLocator(
  page: string,
  oldLocator: string
): Promise<{ newLocator: string; confidence: number } | null> {
  const db = await getDb();
  const row = await db.get(
    `SELECT new_locator as newLocator, confidence
     FROM locator_history
     WHERE page = ? AND old_locator = ?
     ORDER BY timestamp DESC
     LIMIT 1`,
    page,
    oldLocator
  );
  return row || null;
}
