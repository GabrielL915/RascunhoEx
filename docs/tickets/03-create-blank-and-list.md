# 03: Criar diagrama em branco e ver na lista

**What to build:** o dono abre a página inicial, vê sua lista de diagramas (ou um estado vazio com ação de criar), clica em "novo diagrama" e o item aparece na lista com título "Sem título" e data de edição. A lista vem do servidor filtrada pelo dono.

**Blocked by:** 02 (Token de dono)

**Status:** ready-for-agent

- [ ] Migration cria tabela `diagram` (id aleatório URL-safe, owner_id FK, title, scene JSONB, thumbnail nullable, created_at, updated_at)
- [ ] `diagram-domain` define Schemas de Diagram, DiagramSummary, Scene (elements, appState filtrado, files) e o group com `POST /diagrams` e `GET /diagrams` (auth)
- [ ] `diagram-data-source` com repositório (create, listByOwner); `diagram-resource` implementa os handlers
- [ ] `diagram-http-access` expõe Service com create e list via `HttpApiClient`
- [ ] `shared-ui` ganha Button e Input (Base UI + CSS Modules)
- [ ] `diagram-feature-list` renderiza lista ordenada por updatedAt desc com título e data; estado vazio com botão criar
- [ ] `diagram-feature-shell` registra a rota `/` na árvore do TanStack Router
- [ ] Criar redireciona pra `/d/:id` (a rota pode ser placeholder até o ticket 04)
