# 02: Token de dono gerado na primeira visita

**What to build:** na primeira abertura do app, um token de dono é criado no servidor e guardado no browser sem nenhuma ação do usuário. Numa tela de configurações o dono vê e copia seu token. Requisições seguintes enviam o token no header.

**Blocked by:** 01 (Scaffold do monorepo)

**Status:** ready-for-agent

- [ ] Migration cria tabela `owner` (id, token_hash único, created_at)
- [ ] `account-domain` define o `HttpApiGroup` com `POST /owners` e os Schemas; token retornado só nessa resposta
- [ ] `account-data-source` persiste SHA-256 do token; `account-resource` implementa o handler
- [ ] Middleware de autenticação no HttpApi resolve `Authorization: Bearer <token>` pro owner (ou `Unauthorized`), disponível como Service pros outros groups
- [ ] `account-data-access` expõe Service que garante um token: lê do browser ou chama `POST /owners` e guarda
- [ ] `account-feature-token` mostra o token com botão copiar numa rota de configurações
- [ ] Client HTTP do front injeta o header em toda chamada autenticada
- [ ] Token nunca aparece em URL de diagrama
