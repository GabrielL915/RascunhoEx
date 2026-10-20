# 07: Renomear, deletar e copiar link pela lista

**What to build:** em cada item da lista há um menu com "renomear", "copiar link" e "deletar". Renomear edita o título inline. Deletar abre um dialog de confirmação e remove de vez. Copiar link coloca a URL pública na área de transferência e mostra um Toast.

**Blocked by:** 03 (Criar diagrama e lista)

**Status:** ready-for-agent

- [ ] `server/http/diagram` ganha `DELETE /api/diagrams/:id` (dono) com `Forbidden`/`DiagramNotFound`; repositório delete
- [ ] `client/ui/shared` ganha Dialog, DropdownMenu e Toast (Base UI + CSS Modules)
- [ ] Menu por item na lista com as três ações
- [ ] Renomear usa o `PUT /api/diagrams/:id` só com título
- [ ] Deletar exige confirmação; após sucesso o item some sem recarregar a página
- [ ] Copiar link mostra Toast de sucesso
