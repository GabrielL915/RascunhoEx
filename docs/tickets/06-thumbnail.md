# 06: Miniatura na lista

**What to build:** cada item da lista mostra uma miniatura do diagrama, atualizada a cada save.

**Blocked by:** 04 (Editor com autosave)

**Status:** ready-for-agent

- [ ] No ciclo de autosave o editor gera um SVG via `exportToSvg` e envia junto no `PUT`
- [ ] Coluna `thumbnail` persistida; `GET /api/diagrams` devolve a miniatura no resumo
- [ ] `client/ui/diagram` ganha um card com miniatura, título e data; lista usa o card
- [ ] Item sem miniatura (diagrama vazio) mostra placeholder
