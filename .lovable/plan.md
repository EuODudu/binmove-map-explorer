# BinMove — Landing page com mapa interativo de São Paulo

Landing page completa do BinMove no estilo da referência (tema escuro com acentos verde neon), tendo como peça central um **mapa interativo de São Paulo** com pontos de coleta, caminhões em tempo real e trajetos animados.

## Identidade visual

- **Paleta:** preto profundo (#0a0a0a / #111), verde neon BinMove (#22c55e / #4ade80), cinzas escuros para cards, brilho/glow verde sutil em elementos interativos.
- **Tipografia:** sans-serif moderna (Inter/Space Grotesk), títulos pesados em branco com palavra-chave em verde (igual à referência).
- **Estilo:** cards com bordas arredondadas, leve glow, ícones pictográficos coloridos (mapa, reciclagem, gráficos, prêmios).

## Estrutura da landing page

1. **Header fixo** — logo BinMove (ícone de lixeira + texto verde) + nav (Início, Funcionalidades, **Mapa**, Impacto, Recompensas, Premium).
2. **Hero** — título grande "Acompanhe a coleta de lixo em **tempo real**", subtítulo, dois CTAs ("Baixar Gratuitamente" / "Ver Demo") e mockup do app à direita (replicando o card "Olá, João!", próxima coleta, caminhão próximo, grid de atalhos, "Meu Impacto").
3. **Seção Mapa Interativo (peça central)** — descrita abaixo.
4. **Funcionalidades** — grid de 4–6 cards (rastreamento, pontos verdes, agendamento, recompensas, etc.).
5. **Impacto** — métricas grandes (kg reciclados na cidade, CO₂ evitado, usuários ativos).
6. **Recompensas / Premium** — breve seção com benefícios.
7. **Footer** — links e créditos.

## Seção Mapa Interativo — detalhes

**Layout:** mapa em destaque ocupando ~70% da largura + painel lateral à direita com filtros, lista e detalhes.

```text
┌─────────────────────────────────────────────┬──────────────────┐
│                                             │  Filtros         │
│         MAPA DE SÃO PAULO                   │  [♻ Recicláveis] │
│         (tema escuro)                       │  [🍃 Orgânico]   │
│                                             │  [💡 Eletrônico] │
│      ● ponto coleta   🚛 caminhão           │  [🍾 Vidro]      │
│         ─── rota animada                    │                  │
│                                             │  Caminhões ativos│
│                                             │  • SP-1842 ...   │
│                                             │  • SP-2310 ...   │
│                                             │                  │
│                                             │  Detalhe ponto:  │
│                                             │  card expandido  │
└─────────────────────────────────────────────┴──────────────────┘
   25kg Reciclados   |   -12kg CO₂   |   120 Pontos Verdes
```

**Tecnologia:** React-Leaflet + OpenStreetMap, com tile layer escuro (CartoDB Dark Matter) para combinar com o tema. Centro inicial em São Paulo (-23.55, -46.63), zoom inicial mostrando a região central + zona sul/oeste.

**Pontos de coleta (~15–20 marcadores)** distribuídos em bairros reais de SP (Pinheiros, Vila Madalena, Moema, Itaim, Jardins, Vila Mariana, Liberdade, Tatuapé, Lapa, Santana, etc.). Cada ponto tem:
- Tipo: Reciclável / Orgânico / Eletrônico / Vidro / Misto (cor do marcador muda por categoria, com pulso/glow verde nos ativos).
- Popup com: nome, endereço, tipos aceitos, horário, status (aberto/fechado), botão "Ver rotas que passam aqui".

**Caminhões em operação (3–4)** representados por ícones de caminhão verdes que se movem ao longo de rotas pré-definidas (animação JS interpolando coordenadas a cada ~50ms para simular tempo real). Cada caminhão mostra:
- Placa, motorista, próxima parada, ETA, % de capacidade.
- Linha tracejada animada (verde) mostrando o trajeto restante; linha contínua mais apagada para o trajeto já percorrido.

**Filtros (toggles no painel lateral):**
- Por tipo de resíduo (multi-seleção, atualiza marcadores visíveis).
- Mostrar/ocultar caminhões.
- Mostrar/ocultar rotas.

**Lista de caminhões ativos** no painel: clicar em um caminhão centraliza o mapa nele e destaca sua rota.

**Barra de estatísticas** abaixo do mapa: cards com números animados (Pontos ativos, Caminhões em rota, kg coletados hoje, CO₂ evitado).

## Detalhes técnicos

- Stack: React + Vite + Tailwind + shadcn (já no projeto).
- Adicionar dependências: `leaflet`, `react-leaflet`, `@types/leaflet`.
- Tile escuro: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` (gratuito, sem API key).
- Marcadores customizados via `L.divIcon` com SVG inline → permite cor verde neon, pulso CSS e ícones por categoria.
- Animação dos caminhões: hook `useEffect` + `setInterval` interpolando posições ao longo de polylines pré-definidas; reset em loop.
- Dados (pontos e rotas) em `src/data/saoPauloPoints.ts` e `src/data/truckRoutes.ts` — arrays tipados, fáceis de editar.
- Tokens de design adicionados a `index.css` e `tailwind.config.ts`: `--binmove-green`, `--binmove-green-glow`, `--binmove-bg`, `--binmove-card`.
- Componentes novos:
  - `src/components/Header.tsx`
  - `src/components/Hero.tsx` (com mockup do app)
  - `src/components/MapSection.tsx` (wrapper da seção)
  - `src/components/map/BinMoveMap.tsx` (Leaflet)
  - `src/components/map/MapSidebar.tsx` (filtros + lista)
  - `src/components/map/PointPopup.tsx`
  - `src/components/Features.tsx`, `Impact.tsx`, `Footer.tsx`
- `src/pages/Index.tsx` substituído para compor todas as seções.
- CSS de Leaflet importado uma vez em `main.tsx`.
- Responsividade: em telas <1024px o painel lateral vira drawer/abaixo do mapa; mapa mantém altura mínima 500px.

## Fora de escopo

- Backend / dados reais de caminhões (dados serão mockados de forma realista).
- Login, download real do app, integração com APIs de rotas.