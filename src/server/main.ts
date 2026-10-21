import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { z } from 'zod'
import { createDb, runMigrations } from './db/client'
import { healthRoutes } from './http/health'

const env = z
  .object({
    DATABASE_URL: z.string().min(1),
    PORT: z.coerce.number().int().positive().default(3000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  })
  .parse(process.env)

const db = createDb(env.DATABASE_URL)
await runMigrations(db)

const app = new Hono()

app.route('/api/health', healthRoutes(db))

if (env.NODE_ENV === 'production') {
  app.use('*', serveStatic({ root: './dist/client' }))
  app.get('*', serveStatic({ path: './dist/client/index.html' }))
}

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`servidor em http://localhost:${info.port}`)
})
