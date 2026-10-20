# 03: Criar diagrama em branco e ver na lista

**What to build:** o dono abre a página inicial, vê sua lista de diagramas (ou um estado vazio com ação de criar), clica em "novo diagrama" e o item aparece na lista com título "Sem título" e data de edição. A lista vem do servidor filtrada pelo dono.

**Blocked by:** 02 (Token de dono)

**Status:** ready-for-agent

- [ ] Schema Drizzle e migration da tabela `diagram` (id aleatório URL-safe, owner_id FK, title, scene JSONB, thumbnail nullable, created_at, updated_at)
- [ ] `server/domain/diagram` define os tipos Diagram, DiagramSummary, Scene (elements, appState filtrado, files)
- [ ] `server/db/diagram` com repositório (create, listByOwner)
- [ ] `server/http/diagram` expõe `POST /api/diagrams` e `GET /api/diagrams` (auth), com schemas Zod do body
- [ ] `client/api/diagram` com create e list e os tipos de resposta declarados à mão
- [ ] `client/ui/shared` ganha Button e Input (Base UI + CSS Modules)
- [ ] `client/features/diagram/list` renderiza lista ordenada por updatedAt desc com título e data; estado vazio com botão criar
- [ ] Rota `/` registrada em `client/routes`
- [ ] Criar redireciona pra `/d/:id` (a rota pode ser placeholder até o ticket 04)
