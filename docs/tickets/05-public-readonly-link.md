# 05: Link público somente leitura

**What to build:** qualquer pessoa com o link `/d/:id` abre o diagrama na versão atual, dá zoom e pan, mas não edita. Se o id não existe, vê uma página "não encontrado". O dono abrindo o mesmo link cai no editor. No editor há um botão "copiar link".

**Blocked by:** 04 (Editor com autosave)

**Status:** ready-for-agent

- [ ] `GET /diagrams/:id` passa a aceitar requisição sem token; resposta inclui `isOwner` calculado pelo token enviado
- [ ] `diagram-feature-view` renderiza Excalidraw em `viewModeEnabled`, sem toolbar de edição, com zoom e pan, título visível
- [ ] Rota `/d/:id` decide entre editor e view pelo `isOwner`
- [ ] Página "não encontrado" para `DiagramNotFound`
- [ ] Botão "copiar link" no editor com feedback (Toast de `shared-ui`; criar aqui se o ticket 07 ainda não existir)
- [ ] Visitante sem token no browser não recebe token novo ao abrir um link público
