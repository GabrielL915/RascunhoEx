# 04: Editor com autosave

**What to build:** o dono abre `/d/:id`, vê o diagrama no Excalidraw embutido e desenha. Depois de parar de mexer, o diagrama salva sozinho e um indicador mostra "salvando", "salvo" ou "erro ao salvar". O título é editável na mesma tela. Ao reabrir, o zoom e a posição voltam onde estavam. Editor em pt-BR e no tema do sistema.

**Blocked by:** 03 (Criar diagrama e lista)

**Status:** ready-for-agent

- [ ] Group ganha `GET /diagrams/:id` (auth obrigatório por ora) e `PUT /diagrams/:id` (dono) com erros `DiagramNotFound` e `Forbidden`
- [ ] Repositório: findById, update (scene, title); `updated_at` atualizado no update
- [ ] `diagram-http-access` expõe get e update
- [ ] `diagram-feature-editor` monta `@excalidraw/excalidraw` com a cena carregada, `langCode` pt-BR e `theme` seguindo `prefers-color-scheme`
- [ ] Autosave com debounce após a última mudança; não salva se a versão dos elementos não mudou
- [ ] appState persistido limitado a viewBackgroundColor, scrollX, scrollY, zoom, gridSize
- [ ] Arquivos (imagens) da cena persistidos inline em `scene.files`
- [ ] Indicador de estado do save visível no editor
- [ ] Título editável inline, salvo no mesmo fluxo
- [ ] Rota `/d/:id` registrada no `diagram-feature-shell`
