# 01: Scaffold do monorepo com health check ponta a ponta

**What to build:** abrir o app web e ver na tela o status vindo do servidor. Esse ticket prova que a cadeia inteira funciona: contrato HttpApi definido em `shared-api`, servidor Effect respondendo, client tipado gerado no front, tela React renderizando.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] pnpm workspaces com `apps/*` e `packages/*`, Node 22, TypeScript strict, tsconfig base compartilhado
- [ ] ESLint 9 flat config + Prettier + `eslint-plugin-boundaries` com as regras de dependência do spec (domain, ui, data-access, feature, data-source, resource, app, shared)
- [ ] Convenção de módulo pasta `Nome/index.ts(x)`; pacotes expõem `./*` via wildcard no `exports`; nenhum barrel
- [ ] `docker-compose.yml` sobe Postgres local; `.env.example` documentado
- [ ] `shared-api` compõe o `HttpApi` raiz; um group de health expõe `GET /health`
- [ ] `apps/api` serve o HttpApi via `@effect/platform-node` e conecta no Postgres via `@effect/sql-pg` (health consulta `select 1`)
- [ ] `apps/web` com Vite + React 19 + TanStack Router; página inicial chama `/health` via `HttpApiClient` e mostra o resultado
- [ ] Scripts: `pnpm dev` sobe api e web; `pnpm lint` e `pnpm typecheck` passam limpos
- [ ] Infra de migrations com `@effect/sql` rodando no boot do api (ainda sem tabelas)
