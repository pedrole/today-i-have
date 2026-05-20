## Issue: Diretório de utilizadores com insights de atividade

### Contexto
Existe uma pagina por utilizador em `/users/{user}`, mas ainda falta uma pagina de descoberta para explorar rapidamente a comunidade e perceber quem esta mais ativo.

### Objetivo
Criar um indice publico de utilizadores em `/users` com sinais rapidos de atividade, como numero total de updates e ultima data de atualizacao.

### User Story
Como visitante, quero ver uma lista de utilizadores com informacao de atividade recente para descobrir rapidamente quem esta mais envolvido e abrir o respetivo feed.

### Escopo

1. Backend
- Adicionar `GET /users` publicamente.
- Carregar utilizadores com `updates_count` e ultima data de update.
- Marcar utilizadores com atividade recente.

2. Frontend
- Criar a pagina `users/Index.tsx`.
- Mostrar nome, contagem de updates, ultima atividade e um badge de atividade recente.
- Manter a pagina `users/Show.tsx` como detalhe.

3. Navegacao
- Tornar o indice clicavel para abrir o feed individual.
- Manter o padrao visual existente nas listas de tags e updates.

4. Testes
- Cobrir acesso ao indice.
- Cobrir os metadados de atividade.
- Cobrir a pagina de detalhe sem regressar o comportamento anterior.

### Criterios de Aceite
1. `/users` e acessivel sem autenticacao.
2. Cada utilizador mostra numero de updates e ultima atividade.
3. Utilizadores recentes recebem um destaque visual de atividade.
4. O clique abre `/users/{user}`.
5. Testes de feature passam.

### Fora de Escopo
1. Pesquisa global de utilizadores.
2. Paginação.
3. Estatisticas historicas complexas.

### Notas Tecnicas
1. Reutilizar `withCount` e `withMax` para evitar queries manuais desnecessarias.
2. Manter a pagina de detalhe simples e focada no feed.
3. O design deve funcionar bem com poucos ou muitos utilizadores.