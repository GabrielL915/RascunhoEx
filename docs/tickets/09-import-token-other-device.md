# 09: Importar token em outro dispositivo

**What to build:** o dono abre `/me/:token` em outro dispositivo e cai na sua lista já autenticado. Na tela de configurações também dá pra colar um token manualmente e trocar de identidade.

**Blocked by:** 03 (Criar diagrama e lista)

**Status:** ready-for-agent

- [ ] Rota `/me/:token` registrada em `client/routes`: valida o token contra o servidor, guarda no browser e redireciona pra `/`
- [ ] Token inválido mostra erro e mantém a identidade anterior
- [ ] Tela de configurações ganha campo "colar token" com o mesmo fluxo
- [ ] Configurações mostra também um link `/me/:token` pronto pra copiar
- [ ] Endpoint de validação (ex.: `GET /api/owners/me`) devolve 200 pro token válido e `Unauthorized` caso contrário
