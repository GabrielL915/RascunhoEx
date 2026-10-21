import { http } from '../http'

export type HealthResponse = { status: 'ok' }

export async function getHealth() {
  const { data } = await http.get<HealthResponse>('/health')
  return data
}
