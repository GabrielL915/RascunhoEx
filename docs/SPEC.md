# Spec: RascunhoEx — salvar e compartilhar diagramas Excalidraw

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
- Monolito: um único `package.json`, sem workspaces. Node 22, TypeScript strict, pnpm.
- Prettier formata tudo (`pnpm format`). ESLint 9 flat config com `eslint-plugin-boundaries` e `eslint-config-prettier` (desliga regras de estilo que conflitam com o Prettier). Formatação é só do Prettier; lint é só do ESLint. Sem framework de testes por enquanto.
- Front (`src/client`): Vite + React 19, TanStack Router, Base UI (`@base-ui/react`) + CSS Modules, `@excalidraw/excalidraw`. Estado de UI com hooks comuns. Chamadas HTTP com axios: uma instância em `api/` com `baseURL: /api`, interceptor que injeta o `Authorization` e converte respostas de erro no union `_tag`; funções por recurso em cima dela.
- Back (`src/server`): Hono servido por `@hono/node-server`. Validação de entrada com Zod, só no servidor. Persistência com Drizzle ORM (driver `postgres`) e migrations geradas pelo `drizzle-kit`, aplicadas no boot. Postgres via docker-compose.
- Sem código compartilhado entre `src/client` e `src/server`. O front declara os tipos das respostas na mão e confia na API, porque os dois lados são nossos.
- Erros tipados: union discriminada por `_tag` (`{ _tag: 'DiagramNotFound' }`). Funções que podem falhar retornam `Result<T, E>` (tipo próprio pequeno, `ok`/`err`); sem `throw` no domínio.
- Dev: Vite em uma porta com proxy de `/api` pro Hono em outra; `pnpm dev` sobe os dois. Prod: Hono serve o build do Vite como estático e a API sob `/api`.
- Dois tsconfigs: `tsconfig.client.json` (lib DOM) e `tsconfig.server.json` (lib Node), ambos estendendo um base.

### Estrutura de pastas
- `src/server/` e `src/client/` são raízes independentes. Nunca se importam.
- Server, uma pasta por camada, subpasta por domínio (`account`, `diagram`) quando fizer sentido:
  - `domain/`: tipos, erros (`_tag`), regras puras. Não importa nada interno.
  - `db/`: schema Drizzle, migrations, repositórios (funções que recebem o client do Drizzle). Importa só `domain`.
  - `http/`: schemas Zod, middleware de auth, rotas Hono por recurso. Importa `domain` e `db`. Segue o guia de boas práticas do Hono (https://hono.dev/docs/guides/best-practices): um sub-app `Hono` por recurso com caminhos relativos, montado em `main.ts` via `app.route('/api/diagrams', ...)`; handlers inline depois do path, sem controllers, pra manter a inferência dos params; cada módulo de rotas é uma função fábrica que recebe os repositórios e devolve o sub-app; middleware via `createMiddleware` de `hono/factory`.
  - `main.ts`: lê env, conecta no banco, roda migrations, monta o app Hono, serve.
- Client, uma pasta por camada:
  - `api/`: instância axios, funções por recurso, tipos de resposta declarados à mão, erros da API (`_tag`). Não importa nada interno.
  - `ui/`: componentes puros. `ui/shared/` com wrappers de Base UI + CSS Modules (Button, Dialog, DropdownMenu, Toast, Tooltip, Input); `ui/diagram/` com card de diagrama etc. Importa só `ui/shared`.
  - `features/`: telas e fluxos (`diagram/list`, `diagram/editor`, `diagram/view`, `account/token`). Importa `ui` e `api`.
  - `routes/`: árvore do TanStack Router. Importa só `features`.
  - `main.tsx`: monta o router.
- Regras de dependência (travadas por `eslint-plugin-boundaries`):
  - server: `domain` → nada; `db` → `domain`; `http` → `domain`, `db`; `main.ts` → tudo do server.
  - client: `api` → nada; `ui` → `ui/shared`; `features` → `ui`, `api`; `routes` → `features`; `main.tsx` → `routes`.
  - `client/**` nunca importa `server/**` e vice-versa.
- Dependências explícitas: módulos que precisam de banco ou de config recebem como parâmetro (função fábrica ou argumento). Sem container de DI, sem singleton global. `main.ts` é o único lugar que compõe tudo.
- Convenção de módulos: cada módulo é uma pasta `Nome/index.ts(x)` com a implementação dentro. Nunca um `index.ts` que só re-exporta.

### Contrato HTTP
- Prefixo `/api`.
- `POST /owners` → cria owner, retorna o token (única vez que o token trafega em resposta).
- `GET /diagrams` (auth) → lista do dono: id, título, thumbnail, updatedAt.
- `POST /diagrams` (auth) → cria (em branco ou a partir de cena enviada no upload).
- `GET /diagrams/:id` (auth opcional) → cena completa + título + flag `isOwner`.
- `PUT /diagrams/:id` (auth, dono) → atualiza cena, título, thumbnail.
- `DELETE /diagrams/:id` (auth, dono) → remove.
- Erros tipados no corpo da resposta como `{ _tag: 'DiagramNotFound' }` etc.: `DiagramNotFound` (404), `Forbidden` (403), `Unauthorized` (401), `PayloadTooLarge` (413), `InvalidScene` (422).
- Limite de corpo: 5 MB, via middleware `bodyLimit` do Hono.

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
- Costura única preferida: a borda HTTP. Do lado do servidor, testes montam o app Hono com um client Drizzle apontando pra um Postgres de teste e exercitam as rotas com `app.request()`. Do lado do front, features recebem as funções de `api/` como parâmetro e testes passam versões com respostas controladas. Nenhuma camada interna precisa ser mockada.
- Um bom teste exercita comportamento externo (request → response, ação do usuário → estado da tela), nunca detalhes de implementação (nomes de funções internas, SQL).
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

- Publicação no issue tracker pendente: tracker não configurado. Rodar `/setup-matt-pocock-skills` e depois republicar com label `ready-for-agent`.
