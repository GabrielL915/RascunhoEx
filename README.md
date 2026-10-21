# RascunhoEx

Salve seus diagramas Excalidraw e compartilhe por link, sem conta.

## Como rodar

Precisa de Node 22, pnpm e Docker.

```sh
pnpm install
cp .env.example .env
pnpm db:up      # sobe o Postgres local
pnpm dev        # Hono em :3000 e Vite em :5173 (proxy de /api)
```

Outros scripts: `pnpm build` (front pra `dist/client`), `pnpm start` (serve o build e a API em produção), `pnpm lint`, `pnpm format`, `pnpm typecheck`, `pnpm db:generate` (migrations do Drizzle).

## Documentos

- [docs/SPEC.md](docs/SPEC.md): o que o produto faz, decisões de implementação, contrato HTTP, schema do banco, fora de escopo.
- [Issues do repositório](https://github.com/GabrielL915/RascunhoEx/issues): o trabalho quebrado em fatias verticais, numeradas em ordem de dependência. Cada issue diz o que entrega, o que a bloqueia e os critérios de aceite.
- [docs/CODE_REVIEW_BOUNDARIES.md](docs/CODE_REVIEW_BOUNDARIES.md): regras pra um agente de code review decidir o que corrigir sozinho, o que propor e o que ignorar. Usa uma nota de prioridade (valor, risco, esforço) com limiares de ação, e duas travas: nada fora do pedido entra no entregável, e mudança de contrato, schema ou fronteira de camada nunca é feita sem perguntar. Todo review termina com três listas: corrigido, proposto, ignorado com motivo.
