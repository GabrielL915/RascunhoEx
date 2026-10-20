# 02: Token de dono gerado na primeira visita

**What to build:** na primeira abertura do app, um token de dono é criado no servidor e guardado no browser sem nenhuma ação do usuário. Numa tela de configurações o dono vê e copia seu token. Requisições seguintes enviam o token no header.

**Blocked by:** 01 (Scaffold do monolito)

**Status:** ready-for-agent

- [ ] Schema Drizzle e migration da tabela `owner` (id, token_hash único, created_at)
- [ ] `server/domain/account` define o tipo Owner e o erro `Unauthorized`
- [ ] `server/db/account` com repositório (create, findByTokenHash) persistindo SHA-256 do token
- [ ] `server/http/account` expõe `POST /api/owners`; token retornado só nessa resposta
- [ ] Middleware de auth no Hono resolve `Authorization: Bearer <token>` pro owner (ou responde `Unauthorized`) e disponibiliza o owner no contexto das rotas seguintes
- [ ] `client/api/account` garante um token: lê do browser ou chama `POST /api/owners` e guarda
- [ ] `client/api` injeta o header `Authorization` em toda chamada autenticada
- [ ] `client/features/account/token` mostra o token com botão copiar numa rota de configurações
- [ ] Token nunca aparece em URL de diagrama
