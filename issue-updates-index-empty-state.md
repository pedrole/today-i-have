## Issue: Adicionar estado vazio na página de updates

### Contexto

A página `/updates` pode ficar vazia quando nao existem updates publicados. Nessa situacao, a experiencia atual deixa o utilizador sem orientacao visual ou chamada a acao clara.

### Objetivo

Adicionar um empty state visualmente apelativo na pagina `updates/Index` para comunicar a ausencia de conteudo e orientar o utilizador para a proxima acao.

### User Story

Como visitante da página de updates, quero ver uma mensagem clara e um CTA útil quando não existem updates, para perceber o estado da aplicação e saber como começar.

### Escopo

1. Frontend (Inertia + React)

- Atualizar `resources/js/pages/updates/Index.tsx` para renderizar um empty state quando `updatesByDay` estiver vazio.
- Reaproveitar o padrão visual dos empty states existentes na app.
- Exibir um CTA contextual:
    - utilizadores autenticados: criar o primeiro update
    - visitantes: fazer login para começar a contribuir

2. Testes

- Adicionar teste de feature para garantir que a página `updates.index` devolve `updatesByDay` vazio quando nao ha updates.
- Garantir que a página continua a renderizar corretamente com updates existentes.

### Criterios de Aceite

1. Quando `updatesByDay` está vazio, o empty state é apresentado.
2. A mensagem é clara e coerente com o estilo visual da aplicação.
3. O CTA é apropriado para utilizadores autenticados e visitantes.
4. Testes de feature relevantes passam.

### Notas Tecnicas

1. Manter a interface consistente com os empty states usados em `users/Index.tsx`.
2. Reaproveitar o botão de novo update para utilizadores autenticados.
3. Para visitantes, mostrar um link para login e outro para explorar tags.
