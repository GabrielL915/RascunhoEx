import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

export type Db = ReturnType<typeof createDb>

export function createDb(databaseUrl: string) {
  const sql = postgres(databaseUrl)
  return drizzle(sql)
}

export function runMigrations(db: Db) {
  return migrate(db, { migrationsFolder: 'src/server/db/migrations' })
}
