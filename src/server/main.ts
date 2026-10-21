import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { loadConfig } from './config'
import { createDb, runMigrations } from './db/client'
import { healthRoutes } from './http/health'

const config = loadConfig(process.env)
const db = createDb(config.databaseUrl)
await runMigrations(db)

const app = new Hono()

app.route('/api/health', healthRoutes(db))

if (config.isProduction) {
  app.use('*', serveStatic({ root: './dist/client' }))
  app.get('*', serveStatic({ path: './dist/client/index.html' }))
}

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`servidor em http://localhost:${info.port}`)
})
