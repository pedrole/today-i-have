## Issue: Navbar global para navegacao publica

### Contexto
As paginas publicas (updates, tags, users) ainda nao partilham uma navegacao global consistente no topo. A descoberta de secoes depende de links locais em cada pagina, o que cria friccao e inconsistencias de UX.

### Objetivo
Adicionar uma navbar global reutilizavel para as paginas publicas, com navegacao clara entre as principais secoes da aplicacao e comportamento responsivo para mobile.

### User Story
Como visitante, quero uma barra de navegacao fixa e consistente para alternar rapidamente entre Updates, Tags e Users sem depender de links espalhados pelas paginas.

### Escopo

1. Frontend (Inertia + React)
- Criar um componente de navbar reutilizavel para o contexto publico.
- Definir links principais: `Updates`, `Tags`, `Users`.
- Incluir estado ativo por rota atual.
- Incluir CTA para autenticacao (`Login`) quando visitante.
- Incluir adaptacao mobile (menu colapsavel ou drawer simples).

2. Layout
- Criar/usar um layout publico unico que envolva as paginas:
  - `updates/Index.tsx`
  - `tags/Index.tsx`
  - `tags/Show.tsx`
  - `users/Index.tsx`
  - `users/Show.tsx`
- Garantir consistencia visual e de espacos entre paginas.

3. Acessibilidade e UX
- Garantir navegacao por teclado na navbar.
- Garantir labels/texto claros nos itens.
- Garantir contraste e foco visivel nos links.

4. Testes
- Adicionar/ajustar testes de feature para validar renderizacao das paginas publicas com o novo layout sem regressao funcional.
- Validar que links principais continuam acessiveis e as rotas respondem corretamente.

### Criterios de Aceite
1. A navbar aparece em todas as paginas publicas alvo.
2. Os links `Updates`, `Tags` e `Users` funcionam em desktop e mobile.
3. A rota ativa e destacada visualmente.
4. Em estado guest, existe acesso claro ao `Login`.
5. A mudanca nao quebra os fluxos atuais de tags/users/updates.
6. Testes de feature relevantes passam.

### Fora de Escopo
1. Navbar da area autenticada (dashboard/settings), que usa layout proprio.
2. Sistema de pesquisa global.
3. Notificacoes em tempo real na navbar.

### Notas Tecnicas
1. Preferir composicao via layout publico para evitar duplicacao de markup nas paginas.
2. Reaproveitar componentes UI existentes (button/dialog/sheet) quando fizer sentido.
3. Manter a implementacao simples e incremental para facilitar futuras extensoes (ex: busca).
