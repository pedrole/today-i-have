## Issue: Index de tags + visualizacao de updates por tag

### Contexto
Atualmente ja existe suporte para criacao e associacao de tags em updates, mas ainda nao existe uma area dedicada para navegacao por tags.

### Objetivo
Implementar:
1. Um index publico com todas as tags.
2. Uma pagina de detalhe por tag com os updates associados.

### User Story
Como visitante, quero ver a lista de tags e abrir uma tag especifica para explorar os updates relacionados.

### Escopo
1. Backend
- Criar controller de tags com acoes:
- `index`: listar tags com contagem de updates.
- `show`: listar updates de uma tag especifica.

2. Rotas
- Adicionar rotas publicas:
- `GET /tags`
- `GET /tags/{tag}`

3. Frontend (Inertia + React)
- Criar pagina de index de tags.
- Criar pagina de detalhe da tag com lista de updates.
- Adicionar link de navegacao para tags na UI.

4. Testes
- Testar acesso ao index de tags.
- Testar acesso ao detalhe de tag.
- Garantir que o detalhe mostra apenas updates da tag selecionada.

### Criterios de Aceite
1. A rota `/tags` mostra todas as tags com respetiva contagem.
2. Cada tag no index e clicavel.
3. A rota `/tags/{tag}` mostra apenas updates dessa tag.
4. Paginas de tags sao publicas (sem autenticacao).
5. Testes de feature para tags passam.

### Fora de Escopo
1. Edicao/remocao de tags.
2. Filtros avancados combinando multiplas tags.
3. Paginacao (opcional para fase seguinte).

### Notas Tecnicas
1. Reutilizar eager loading para evitar N+1.
2. Manter consistencia visual com a pagina de updates.
3. Garantir ordenacao consistente dos updates (mais recentes primeiro).

### Estimativa
M (medio)

### Labels sugeridas
`backend`, `frontend`, `inertia`, `react`, `tags`, `tests`, `feature`
