# 10: Limite de 5 MB e erros de payload

**What to build:** diagramas acima de 5 MB não são aceitos. No editor, se o autosave falhar por tamanho, o dono vê um aviso dizendo que passou do limite. No upload, o mesmo aviso aparece antes de enviar.

**Blocked by:** 04 (Editor com autosave), 08 (Upload de arquivo .excalidraw)

**Status:** ready-for-agent

- [ ] Servidor rejeita corpo acima de 5 MB via `bodyLimit` do Hono respondendo `{ _tag: 'PayloadTooLarge' }` com 413
- [ ] Editor mostra estado "erro: diagrama acima do limite" no indicador de save e não entra em loop de retry
- [ ] Upload checa o tamanho no cliente antes de enviar e mostra erro em pt-BR
- [ ] Erros `InvalidScene` e `PayloadTooLarge` tratados de forma distinta na UI
