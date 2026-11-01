import Database from 'better-sqlite3';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Determine if we should use SQLite
// 1. No DATABASE_URL provided
// 2. FORCE_SQLITE is set to true
// 3. DATABASE_URL contains an internal/unresolvable host (e.g. Render internal 'dpg-...' without domain)
let shouldUseSqlite = !process.env.DATABASE_URL || process.env.FORCE_SQLITE === 'true';

if (!shouldUseSqlite && process.env.DATABASE_URL) {
  try {
    const parsed = new URL(process.env.DATABASE_URL);
    // Hosts without a dot (like dpg-d6nbc1f5gffc73bvgsv0-a) are internal private hostnames
    if (!parsed.hostname.includes('.') || parsed.hostname.endsWith('.internal')) {
      console.warn(`[DB] Notice: DATABASE_URL host "${parsed.hostname}" is an internal private network address.`);
      console.warn(`[DB] Automatically switching to embedded SQLite (jhf_erp.db) for full AI Studio publishing compatibility.`);
      shouldUseSqlite = true;
    }
  } catch {
    shouldUseSqlite = true;
  }
}

export let isSqlite = shouldUseSqlite;
export let sqliteDb: any = null;
export let pool: any = null;

// Initialize SQLite immediately so it's always ready
sqliteDb = new Database('jhf_erp.db');
sqliteDb.pragma('journal_mode = WAL');

if (!isSqlite && process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 3000,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
}

// Function to switch to SQLite if PG fails at runtime
export const switchToSqlite = (reason?: string) => {
  if (!isSqlite) {
    console.warn(`[DB] Fallback: Switching to SQLite. Reason: ${reason || 'Unknown error'}`);
    isSqlite = true;
  }
};

export const dbQuery = async (text: string, params: any[] = []) => {
  if (isSqlite) {
    const sqliteText = text.replace(/\$\d+/g, '?');
    const upperText = text.trim().toUpperCase();
    if (upperText.startsWith('SELECT') || upperText.startsWith('PRAGMA')) {
      const rows = sqliteDb.prepare(sqliteText).all(params);
      return { rows, rowCount: rows.length };
    } else {
      const result = sqliteDb.prepare(sqliteText).run(params);
      return { rows: [], rowCount: result.changes, lastInsertRowid: result.lastInsertRowid };
    }
  } else {
    try {
      return await pool.query(text, params);
    } catch (err: any) {
      if (err.code === 'EAI_AGAIN' || err.message?.includes('getaddrinfo') || err.message?.includes('timeout')) {
        switchToSqlite(err.message);
        return dbQuery(text, params);
      }
      throw err;
    }
  }
};

export const getClient = async () => {
  if (isSqlite) {
    return {
      query: dbQuery,
      release: () => {},
      rollback: () => sqliteDb.prepare('ROLLBACK').run(),
      commit: () => sqliteDb.prepare('COMMIT').run(),
      begin: () => sqliteDb.prepare('BEGIN').run()
    };
  } else {
    try {
      const client = await pool.connect();
      return {
        query: (text: string, params: any[] = []) => client.query(text, params),
        release: () => client.release(),
        rollback: () => client.query('ROLLBACK'),
        commit: () => client.query('COMMIT'),
        begin: () => client.query('BEGIN'),
        rawClient: client
      };
    } catch (err: any) {
      if (err.code === 'EAI_AGAIN' || err.message?.includes('getaddrinfo') || err.message?.includes('timeout')) {
        switchToSqlite(err.message);
        return getClient();
      }
      throw err;
    }
  }
};

export default isSqlite ? sqliteDb : pool;
