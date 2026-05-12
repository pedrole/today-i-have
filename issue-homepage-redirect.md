## Issue: Redirecionar homepage para updates

### Contexto

A homepage (`/`) renderizava uma pagina de boas-vindas (`welcome`) com pouco valor para o utilizador. O conteudo principal da aplicacao esta em `/updates`.

### Objetivo

Redirecionar automaticamente a rota raiz para a listagem de updates, melhorando a experiencia de navegacao.

### User Story

Como visitante, quero que ao aceder ao site seja encaminhado diretamente para a lista de updates sem precisar de navegar manualmente.

### Escopo

1. Rotas

- Substituir a rota `GET /` que renderizava a view `welcome` por um redirecionamento permanente para `/updates`.

2. Testes

- Adicionar teste de feature que garante que `GET /` redireciona para `/updates`.

### Criterios de Aceite

1. Aceder a `/` redireciona para `/updates`.
2. O redirecionamento funciona para utilizadores autenticados e nao autenticados.
3. Teste de feature passa.

### Fora de Escopo

1. Remocao da pagina `welcome.tsx` (mantida para uso futuro).
2. Alteracoes de autenticacao ou middleware.

### Notas Tecnicas

1. Usar `Route::redirect('/', '/updates')->name('home')` em `routes/web.php`.
2. A rota mantem o nome `home` para compatibilidade com referencias existentes.
