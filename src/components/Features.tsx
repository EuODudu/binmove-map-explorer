import { Truck, Map, Recycle, BarChart3, Gift, Bell } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Rastreamento ao vivo",
    desc: "Veja caminhões em movimento e receba notificações antes da chegada na sua rua.",
  },
  {
    icon: Map,
    title: "Pontos por toda cidade",
    desc: "Mais de 18 pontos de coleta mapeados em São Paulo, com filtros por tipo de resíduo.",
  },
  {
    icon: Recycle,
    title: "Reciclagem inteligente",
    desc: "Identifique o que reciclar, onde descartar e como separar corretamente.",
  },
  {
    icon: Bell,
    title: "Agendamento simples",
    desc: "Programe coletas especiais para móveis, eletrônicos e materiais grandes.",
  },
  {
    icon: BarChart3,
    title: "Seu impacto medido",
    desc: "Acompanhe quanto você reciclou e o CO₂ evitado mês a mês, com relatórios claros.",
  },
  {
    icon: Gift,
    title: "Recompensas sustentáveis",
    desc: "Acumule pontos verdes e troque por descontos em parceiros sustentáveis.",
  },
];

export default function Features() {
  return (
    <section
      id="funcionalidades"
      className="scroll-mt-24 border-t border-border/50 py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Funcionalidades
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Tudo que você precisa para{" "}
            <span className="text-primary">reciclar melhor</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary/25">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
