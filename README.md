# RascunhoEx

Salve seus diagramas Excalidraw e compartilhe por link, sem conta.

## Documentos

- [docs/SPEC.md](docs/SPEC.md): o que o produto faz, decisões de implementação, contrato HTTP, schema do banco, fora de escopo.
- [docs/tickets/](docs/tickets/): o trabalho quebrado em fatias verticais, numeradas em ordem de dependência. Cada ticket diz o que entrega, o que o bloqueia e os critérios de aceite.
- [docs/CODE_REVIEW_BOUNDARIES.md](docs/CODE_REVIEW_BOUNDARIES.md): regras pra um agente de code review decidir o que corrigir sozinho, o que propor e o que ignorar. Usa uma nota de prioridade (valor, risco, esforço) com limiares de ação, e duas travas: nada fora do pedido entra no entregável, e mudança de contrato, schema ou fronteira de camada nunca é feita sem perguntar. Todo review termina com três listas: corrigido, proposto, ignorado com motivo.
