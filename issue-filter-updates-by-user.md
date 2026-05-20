## Issue: Filtrar updates por utilizador

### Contexto

Atualmente a listagem de updates (`/updates`) mostra o nome do autor de cada update, mas nao existe forma de filtrar ou navegar pelos updates de um utilizador especifico.

### Objetivo

Implementar uma pagina dedicada por utilizador que liste todos os seus updates, tornando os nomes dos autores clicaveis em toda a aplicacao.

### User Story

Como visitante, quero clicar no nome de um utilizador e ver todos os updates que ele publicou, para acompanhar o trabalho de uma pessoa especifica.

### Escopo

1. Backend

- Adicionar relacao `updates()` (hasMany) ao model `User`.
- Criar `UserController` com acao `show(User $user)`:
    - Carrega updates do utilizador com eager loading de `user` e `tags`.
    - Agrupa por `posted_on` (mais recentes primeiro).
    - Renderiza a pagina Inertia `users/Show`.

2. Rotas

- Adicionar rota publica `GET /users/{user}` via `Route::resource('users', UserController::class)->only(['show'])`.

3. Frontend (Inertia + React)

- Criar pagina `users/Show.tsx` com:
    - Cabecalho com o nome do utilizador.
    - Lista de updates agrupada por data (mesma estrutura visual das outras paginas).
    - Link de retorno para `/updates`.
- Atualizar `updates/Index.tsx`: envolver o nome do autor num `<Link>` para `/users/{id}`.
- Atualizar `tags/Show.tsx`: idem.

4. Testes

- Testar que visitantes podem aceder a pagina de utilizador.
- Testar que apenas updates do utilizador selecionado sao apresentados.
- Testar props Inertia (`users/Show`, `user`, `updatesByDay`).

### Criterios de Aceite

1. A rota `/users/{user}` e publica (sem autenticacao).
2. A pagina mostra apenas os updates do utilizador selecionado.
3. O nome do autor e clicavel em `/updates` e em `/tags/{tag}`.
4. A pagina de utilizador sem updates mostra uma mensagem de estado vazio.
5. Testes de feature para `UserController` passam.

### Fora de Escopo

1. Pagina de listagem de todos os utilizadores (`/users`).
2. Edicao de perfil de utilizador nesta pagina.
3. Paginacao (opcional para fase seguinte).

### Notas Tecnicas

1. Route model binding por chave primaria (`id`), consistente com tags.
2. Reutilizar eager loading para evitar N+1.
3. Manter consistencia visual com `tags/Show.tsx`.
