import { useEffect, useState } from 'react'
import { getHealth } from '../../api/health'
import styles from './styles.module.css'

type ServerStatus = 'checking' | 'ok' | 'unreachable'

const label: Record<ServerStatus, string> = {
  checking: 'verificando…',
  ok: 'ok',
  unreachable: 'fora do ar',
}

export function HomePage() {
  const [status, setStatus] = useState<ServerStatus>('checking')

  useEffect(() => {
    getHealth()
      .then((health) => setStatus(health.status))
      .catch(() => setStatus('unreachable'))
  }, [])

  return (
    <main className={styles.page}>
      <h1>RascunhoEx</h1>
      <p className={styles.status} data-status={status}>
        Servidor: {label[status]}
      </p>
    </main>
  )
}
