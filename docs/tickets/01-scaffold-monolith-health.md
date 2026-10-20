# 01: Scaffold do monolito com health check ponta a ponta

**What to build:** abrir o app web e ver na tela o status vindo do servidor. Esse ticket prova que a cadeia inteira funciona: rota Hono em `src/server`, banco respondendo, axios no front, tela React renderizando.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Um `package.json` na raiz, pnpm, Node 22, TypeScript strict; `tsconfig.base.json` + `tsconfig.client.json` (DOM) + `tsconfig.server.json` (Node)
- [ ] Prettier com `.prettierrc` e script `pnpm format`; ESLint 9 flat config + `eslint-config-prettier` + `eslint-plugin-boundaries` com as regras de dependência do spec (server: domain, db, http; client: api, ui, features, routes; client e server nunca se importam)
- [ ] Convenção de módulo pasta `Nome/index.ts(x)`; nenhum barrel
- [ ] `docker-compose.yml` sobe Postgres local; `.env.example` documentado
- [ ] `src/server/main.ts` conecta no Postgres via Drizzle (driver `postgres`), roda migrations do `drizzle-kit` no boot (ainda sem tabelas) e serve o Hono com `@hono/node-server`
- [ ] `GET /api/health` consulta `select 1` e responde `{ status: 'ok' }`
- [ ] `src/client` com Vite + React 19 + TanStack Router; página inicial chama `/api/health` via instância axios em `api/` e mostra o resultado
- [ ] Vite faz proxy de `/api` pro servidor em dev; em prod o Hono serve `dist/client` como estático
- [ ] Scripts: `pnpm dev` sobe servidor e Vite juntos; `pnpm build`, `pnpm lint`, `pnpm format:check` e `pnpm typecheck` passam limpos
