# Spec: saveExcalidraw — salvar e compartilhar diagramas Excalidraw

Status: ready-for-agent
Origem: sessão de grilling em 2026-10-11.

## Problem Statement

Tenho diagramas feitos no Excalidraw e quero guardá-los num lugar meu, abrir qualquer um deles
de qualquer dispositivo e mandar um link pra alguém ver. O excalidraw.com só salva no
localStorage do browser e o link de compartilhamento nativo congela um snapshot. Não quero
criar conta nem gerenciar usuários.

## Solution

Um app web pessoal, sem cadastro. Na primeira visita o app gera um **token de dono** e guarda no
browser. Tudo que eu salvo fica ligado a esse token. Posso ver minha lista de diagramas, abrir um
no editor Excalidraw embutido, fazer upload de um arquivo `.excalidraw`, e compartilhar o link
`/d/:id`. Quem abre o link sem o token vê o diagrama em modo somente leitura, sempre na versão
atual. Pra usar em outro dispositivo, colo meu token (ou abro `/me/:token`).

## User Stories

### Identidade (Owner)
1. Como visitante na primeira abertura do app, quero que um token de dono seja gerado e guardado automaticamente, para que eu comece a salvar sem cadastro.
2. Como dono, quero ver e copiar meu token, para que eu consiga usar o app em outro dispositivo.
3. Como dono, quero abrir `/me/:token` em outro dispositivo e ser redirecionado pra minha lista, para que eu importe minha identidade sem digitar nada.
4. Como dono, quero colar um token manualmente numa tela de configurações, para que eu troque de identidade sem precisar da URL.
5. Como dono, quero que meu token nunca apareça no link público, para que quem recebe o link não consiga editar meus diagramas.
6. Como operador do sistema, quero que o banco guarde só o hash do token, para que um vazamento do banco não exponha identidades.

### Lista de diagramas
7. Como dono, quero ver todos os meus diagramas numa lista, para que eu ache rápido o que procuro.
8. Como dono, quero ver uma miniatura de cada diagrama na lista, para que eu reconheça pelo visual sem abrir.
9. Como dono, quero ver o título de cada diagrama na lista, para que eu identifique pelo nome.
10. Como dono, quero ver a data da última edição na lista, para que eu saiba qual é o mais recente.
11. Como dono, quero a lista ordenada por última edição, para que o que estou trabalhando fique no topo.
12. Como dono, quero criar um diagrama novo em branco a partir da lista, para que eu comece a desenhar em um clique.
13. Como dono, quero renomear um diagrama direto na lista, para que eu organize sem abrir o editor.
14. Como dono, quero deletar um diagrama da lista com uma confirmação, para que eu não apague por engano.
15. Como dono, quero copiar o link público de um diagrama direto da lista, para que eu compartilhe sem abrir.
16. Como dono com lista vazia, quero ver um estado vazio com ação de criar ou fazer upload, para que eu saiba por onde começar.

### Upload
17. Como dono, quero escolher um arquivo `.excalidraw` do disco, para que eu importe diagramas feitos no excalidraw.com.
18. Como dono, quero arrastar um arquivo `.excalidraw` pra lista, para que o upload seja rápido.
19. Como dono, quero que o upload sempre crie um diagrama novo, para que eu nunca sobrescreva um existente sem querer.
20. Como dono, quero que o título do diagrama importado venha do nome do arquivo, para que eu não precise renomear.
21. Como dono, quero ver um erro claro se o arquivo não for um `.excalidraw` válido, para que eu saiba o que deu errado.
22. Como dono, quero ver um erro claro se o arquivo passar do limite de tamanho, para que eu saiba por que não subiu.

### Editor
23. Como dono, quero abrir `/d/:id` e editar no Excalidraw embutido, para que eu trabalhe sem sair do app.
24. Como dono, quero que o diagrama seja salvo automaticamente depois que paro de mexer, para que eu nunca perca trabalho.
25. Como dono, quero ver um indicador "salvando / salvo / erro ao salvar", para que eu confie que está persistido.
26. Como dono, quero que o título seja editável na tela do editor, para que eu nomeie enquanto desenho.
27. Como dono, quero que a miniatura seja regenerada a cada save, para que a lista reflita o estado atual.
28. Como dono, quero que imagens que eu colo no diagrama sejam salvas junto, para que o diagrama abra completo em outro lugar.
29. Como dono, quero um botão "copiar link" no editor, para que eu compartilhe o que estou vendo.
30. Como dono, quero que o editor siga o tema claro/escuro do sistema, para que fique consistente com o resto.
31. Como dono, quero que a interface esteja em pt-BR, para que eu use na minha língua.
32. Como dono, quero que o viewport (zoom/scroll) seja restaurado ao reabrir, para que eu continue de onde parei.
33. Como dono, quero ser avisado se o save falhar por o diagrama ter passado do limite de tamanho, para que eu reduza e tente de novo.

### Visualização pública
34. Como visitante com o link, quero abrir `/d/:id` e ver o diagrama, para que eu entenda o que me mandaram.
35. Como visitante, quero dar zoom e pan no diagrama, para que eu veja detalhes.
36. Como visitante, quero que a edição esteja bloqueada, para que eu não altere o diagrama de outra pessoa.
37. Como visitante, quero ver sempre a versão mais recente, para que o link não fique desatualizado.
38. Como visitante, quero ver o título do diagrama na página, para que eu saiba do que se trata.
39. Como visitante, quero ver uma página "não encontrado" se o id não existir ou foi deletado, para que eu não veja uma tela quebrada.
40. Como visitante, quero que o diagrama abra sem precisar de token, para que o link funcione pra qualquer pessoa.
41. Como dono abrindo meu próprio link, quero cair direto no editor, para que o mesmo link sirva pra mim e pra quem recebe.

### Operação e limites
42. Como operador, quero que o payload de um diagrama seja limitado a 5 MB, para que um diagrama gigante não derrube o serviço.
43. Como operador, quero que os ids dos diagramas sejam aleatórios e não sequenciais, para que ninguém enumere diagramas alheios.
44. Como operador, quero rodar o Postgres local com um comando, para que o ambiente de dev suba sem configuração manual.

## Implementation Decisions

### Produto
- Sem contas. Identidade = token aleatório gerado no cliente, guardado no browser e enviado como `Authorization: Bearer <token>`. Servidor guarda SHA-256 do token.
- Todo diagrama é público pelo link. Não há toggle de visibilidade. Ids aleatórios não adivinháveis.
- Link vivo: o `/d/:id` sempre mostra o estado atual.
- Mesmo link pra dono e visitante; o cliente decide editor vs view pela resposta do servidor (flag `isOwner`, calculada pelo token enviado).
- Autosave com debounce após inatividade; sem botão "salvar".
- Upload só cria diagrama novo.
- Hard delete com confirmação, sem lixeira.
- Tema do Excalidraw segue o sistema. UI em pt-BR.

### Stack
- Monorepo pnpm workspaces (sem Nx). Node 22, TypeScript strict.
- ESLint 9 flat config + `eslint-plugin-boundaries` + Prettier. Sem framework de testes por enquanto.
- Front: Vite + React 19, TanStack Router, Base UI (`@base-ui/react`) + CSS Modules, `@excalidraw/excalidraw`.
- Effect no front só na camada de dados: `HttpApiClient` gerado do contrato, `Schema` pra validação, erros tipados. Estado de UI com hooks comuns.
- Back: `@effect/platform` `HttpApi` servido por `@effect/platform-node`. Sem Fastify. Persistência com `@effect/sql-pg`. Postgres via docker-compose.

### Estrutura de pacotes (padrão devmx, adaptado)
- `apps/web` e `apps/api` mínimos: só compõem Layers e montam rotas.
- Um pacote npm por camada, por domínio:
  - `diagram-domain`, `diagram-http-access`, `diagram-data-source`, `diagram-resource`, `diagram-ui`, `diagram-feature-list`, `diagram-feature-editor`, `diagram-feature-view`, `diagram-feature-shell`.
  - `account-domain`, `account-http-access`, `account-data-source`, `account-resource`, `account-ui`, `account-feature-token`, `account-feature-shell`.
  - `shared-api` (compõe o `HttpApi` raiz a partir dos `HttpApiGroup` de cada domain), `shared-ui` (wrappers de Base UI com CSS Modules: Button, Dialog, DropdownMenu, Toast, Tooltip, Input), `shared-util-errors` (erros base com `Data.TaggedError`), `shared-util-data` (ids, datas).
- Regras de dependência (travadas por lint):
  - `domain` → só `shared-util-*`.
  - `ui` → `shared-ui`, `shared-util-*`.
  - `http-access` → `domain`, `shared-api`, `shared-util-*`.
  - `feature-*` → `ui`, `http-access`, `domain`, `shared-*`.
  - `data-source` → `domain`, `shared-util-*`.
  - `resource` → `data-source`, `domain`, `shared-api`, `shared-util-*`.
  - `apps/web` → `feature-*`; `apps/api` → `resource`, `shared-api`. Front nunca importa `data-source`/`resource`; back nunca importa `ui`/`feature`/`http-access`.
- Camadas usam vocabulário Effect: `Service` (Context.Tag) + `Layer` (impl). Sem pastas `application/infrastructure/dtos`.
- Convenção de módulos: cada módulo é uma pasta `Nome/index.ts(x)` com a implementação dentro. Nunca um `index.ts` que só re-exporta. Pacotes expõem `./*` via wildcard no `exports` apontando pra `src/*/index.ts`.

### Contrato HTTP (HttpApi)
- `POST /owners` → cria owner, retorna o token (única vez que o token trafega em resposta).
- `GET /diagrams` (auth) → lista do dono: id, título, thumbnail, updatedAt.
- `POST /diagrams` (auth) → cria (em branco ou a partir de cena enviada no upload).
- `GET /diagrams/:id` (auth opcional) → cena completa + título + flag `isOwner`.
- `PUT /diagrams/:id` (auth, dono) → atualiza cena, título, thumbnail.
- `DELETE /diagrams/:id` (auth, dono) → remove.
- Erros tipados: `DiagramNotFound`, `Forbidden`, `Unauthorized`, `PayloadTooLarge`, `InvalidScene`.
- Limite de corpo: 5 MB.

### Schema do banco
- `owner`: id, token_hash (único), created_at.
- `diagram`: id (aleatório, curto, URL-safe), owner_id (FK), title, scene (JSONB: elements + appState filtrado + files inline), thumbnail (SVG em texto, nullable), created_at, updated_at.
- `appState` persistido é um subconjunto: viewBackgroundColor, scrollX, scrollY, zoom, gridSize. Nunca persistir estado efêmero (seleção, collaborators, etc.).

### Editor
- Autosave: debounce após a última mudança de `elements`/`files`/`appState` relevante; comparação por versão dos elementos pra não salvar sem mudança.
- Thumbnail: gerada no cliente com `exportToSvg` no mesmo ciclo do save.
- Imagens: ficam inline em `scene.files` (base64). Aceito como limitação consciente até o limite de 5 MB.
- Modo view: Excalidraw em `viewModeEnabled`, sem toolbar de edição.

## Testing Decisions

- Decisão explícita: **sem testes nesta fase**. O que segue é o desenho das costuras para quando entrarem.
- Costura única preferida: o contrato `HttpApi` em `shared-api`. Do lado do servidor, testes sobem a API com um `Layer` de banco (Postgres de teste) e exercitam as rotas via `HttpApiClient`. Do lado do front, features recebem um `Layer` do client com respostas controladas. Nenhuma camada interna precisa ser mockada.
- Um bom teste exercita comportamento externo (request → response, ação do usuário → estado da tela), nunca detalhes de implementação (nomes de Services, SQL).
- Sem prior art no repo (projeto novo).

## Out of Scope

- Contas, login, e-mail, senha.
- Colaboração em tempo real / edição por visitantes / fork por visitantes.
- Diagramas privados ou toggle de visibilidade.
- Snapshot de versões / histórico.
- Lixeira / undo de delete.
- Rate limit no endpoint público.
- Storage externo para imagens.
- Deploy / hospedagem (decisão adiada).
- Substituir um diagrama existente via upload.
- Testes automatizados (adiado).

## Further Notes

- Referência de estrutura: repositório `DeveloperParana/devmx` (Nx + Angular + NestJS). Adotamos a divisão de pacotes por camada e por tela, e a ideia de fronteiras por lint; trocamos Nx por pnpm + `eslint-plugin-boundaries`, Angular DI por Effect Service/Layer, e barrel files por pasta-módulo.
- Pesquisa de UI (2026-10-11): Base UI escolhido sobre Radix (ergonomia igual, docs em CSS Modules, release mensal, Toast estável) e React Aria (Toast ainda instável, API mais pesada).
- Publicação no issue tracker pendente: tracker não configurado. Rodar `/setup-matt-pocock-skills` e depois republicar com label `ready-for-agent`.
