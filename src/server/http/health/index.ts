import { sql } from 'drizzle-orm'
import { Hono } from 'hono'
import type { Db } from '../../db/client'

export function healthRoutes(db: Db) {
  return new Hono().get('/', async (c) => {
    await db.execute(sql`select 1`)
    return c.json({ status: 'ok' })
  })
}
