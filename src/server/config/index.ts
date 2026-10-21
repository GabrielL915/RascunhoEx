export type Config = {
  databaseUrl: string
  port: number
  isProduction: boolean
}

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const databaseUrl = env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL não definida')
  return {
    databaseUrl,
    port: Number(env.PORT ?? 3000),
    isProduction: env.NODE_ENV === 'production',
  }
}
