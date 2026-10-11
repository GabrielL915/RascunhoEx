# saveExcalidraw

Spec em `docs/SPEC.md`. Tickets em `docs/tickets/`.

## Regras de código

- Sem comentários no código. Nome claro e função pequena no lugar de comentário. Exceção única: comentário obrigatório por ferramenta (ex.: `eslint-disable` com motivo).
- Cada módulo é uma pasta `Nome/index.ts(x)` com a implementação dentro. Nunca `index.ts` que só re-exporta.
- Pacotes expõem `./*` via wildcard no `exports`. Importar pelo subpath do pacote.
- Um pacote por camada e por domínio (`diagram-domain`, `diagram-data-access`, ...). Setas de dependência travadas por `eslint-plugin-boundaries`; não contornar.
- Effect: `Service` (Context.Tag) + `Layer`. Sem facades, use-cases ou pastas `application/infrastructure/dtos`.
- Front: React 19, Vite, TanStack Router, Base UI, CSS Modules. Nunca Next.js, Tailwind ou CSS-in-JS.
- Back: `@effect/platform` HttpApi + `@effect/sql-pg`. Sem Fastify/Express.
- UI em pt-BR.
- Sem testes nesta fase, salvo pedido explícito.
