# 08: Upload de arquivo .excalidraw

**What to build:** o dono escolhe um `.excalidraw` do disco ou arrasta pra lista; um diagrama novo é criado com o título vindo do nome do arquivo e aparece na lista. Arquivo inválido mostra um erro claro.

**Blocked by:** 03 (Criar diagrama e lista)

**Status:** ready-for-agent

- [ ] `POST /diagrams` aceita cena inicial opcional e título
- [ ] Schema `Scene` em `diagram-domain` valida o conteúdo do arquivo (formato excalidraw, elements, appState, files); erro `InvalidScene`
- [ ] Botão de upload com file picker na lista (também no estado vazio)
- [ ] Drag-and-drop na área da lista com feedback visual
- [ ] Título = nome do arquivo sem extensão
- [ ] Erro de arquivo inválido mostrado ao usuário em pt-BR
