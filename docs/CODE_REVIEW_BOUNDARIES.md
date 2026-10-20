# Code review boundaries: o que o agente muda sozinho, propõe, ou deixa quieto

Notas são julgamento, não medição. Escala 1 a 5 em tudo.

## Fórmula

```
prioridade = valor × (6 − risco) / esforço
```

- **valor**: quanto o usuário ganha. 5 = sem isso o produto não funciona. 1 = ninguém nota.
- **risco**: chance de quebrar algo que já funciona ou de ser uma decisão que o dono do projeto não tomou. 5 = muda contrato, schema ou arquitetura. 1 = local e reversível.
- **esforço**: 1 = uma função. 3 = um ticket. 5 = vários tickets.

## Limiares

| Faixa | Ação |
| --- | --- |
| prioridade ≥ 8 e risco ≤ 2 | Faz sem perguntar. Relata no final. |
| prioridade ≥ 8 e risco ≥ 3 | Propõe em uma frase e espera. |
| 3 ≤ prioridade < 8 | Lista como sugestão no relatório. Não faz. |
| prioridade < 3 | Não menciona. |

Duas travas que valem acima da fórmula:

1. Nada que o pedido não citou e o spec não cobre entra no entregável. Se um exemplo no brief virar exigência, parar e perguntar. Um gráfico "de exemplo" não é um gráfico pedido.
2. Mudança de contrato HTTP, schema do banco, ou fronteira entre camadas é sempre risco 5, independente do tamanho do diff.

## Tickets, com as notas atuais

| # | Issue | Valor | Risco | Esforço | Prioridade |
| --- | --- | --- | --- | --- | --- |
| #1 | Scaffold + health | 5 | 2 | 4 | 5,0 |
| #2 | Token de dono | 5 | 3 | 3 | 5,0 |
| #3 | Criar e listar | 5 | 2 | 3 | 6,7 |
| #4 | Editor com autosave | 5 | 3 | 4 | 3,8 |
| #5 | Link público | 5 | 2 | 2 | 10,0 |
| #6 | Miniatura | 3 | 1 | 2 | 7,5 |
| #7 | Renomear, deletar, copiar | 3 | 2 | 2 | 6,0 |
| #8 | Upload .excalidraw | 4 | 2 | 2 | 8,0 |
| #9 | Importar token | 3 | 1 | 1 | 15,0 |
| #10 | Limite de 5 MB | 2 | 1 | 1 | 10,0 |

Leitura: a ordem de dependência manda nos tickets 01 a 04, não a prioridade. Depois do 04, a fórmula sugere 05, 09, 08, 06, 07, 10. Os tickets 09 e 10 são baratos e sobem na tabela por isso, não por valor.

## Findings de code review

Mesma fórmula, com "valor" lido como "dano se não corrigir".

| Tipo de finding | Valor | Risco típico | Ação padrão |
| --- | --- | --- | --- |
| Bug que corrompe dado ou expõe token | 5 | 1 a 2 | Corrige. |
| Bug visível ao usuário | 4 | 1 a 2 | Corrige. |
| Violação de fronteira entre camadas | 4 | 2 | Corrige se é mover import. Propõe se exige nova camada. |
| Comentário no código, barrel file | 3 | 1 | Corrige. |
| Simplificação de lógica | 2 | 2 | Sugere. |
| Renomear por gosto, reordenar, estilo | 1 | 1 | Não menciona. |
| Qualquer coisa que mude contrato, schema ou arquitetura | — | 5 | Propõe. Nunca faz. |

Um relatório de review termina com três listas: corrigido, proposto, ignorado com motivo. Nada corrigido fora da lista "corrigido".
