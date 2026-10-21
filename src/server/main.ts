import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { createDb, runMigrations } from './db/client'
import { healthRoutes } from './http/health'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL não definida')
const port = Number(process.env.PORT ?? 3000)
const isProduction = process.env.NODE_ENV === 'production'

const db = createDb(databaseUrl)
await runMigrations(db)

const app = new Hono()

app.route('/api/health', healthRoutes(db))

if (isProduction) {
  app.use('*', serveStatic({ root: './dist/client' }))
  app.get('*', serveStatic({ path: './dist/client/index.html' }))
}

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`servidor em http://localhost:${info.port}`)
})
