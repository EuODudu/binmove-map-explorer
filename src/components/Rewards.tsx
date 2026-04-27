import { Gift, Sparkles, Check } from "lucide-react";

export default function Rewards() {
  const benefits = [
    "Mapa em tempo real ilimitado",
    "Notificações personalizadas por bairro",
    "Histórico completo de impacto",
    "Multiplicador 2x em pontos verdes",
    "Acesso antecipado a novas funções",
  ];

  return (
    <section
      id="recompensas"
      className="scroll-mt-24 border-t border-border/50 py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div id="premium">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Recompensas & Premium
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
              Recicle, ganhe pontos e{" "}
              <span className="text-primary">troque por benefícios reais</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              A cada descarte correto você acumula pontos verdes que podem ser
              trocados por descontos em parceiros sustentáveis ou doações para
              ONGs ambientais de São Paulo.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#mapa"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-glow"
              >
                <Sparkles className="h-5 w-5" />
                Começar agora
              </a>
              <a
                href="#mapa"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 px-6 py-4 text-sm font-semibold text-foreground transition hover:border-primary/40"
              >
                <Gift className="h-5 w-5 text-primary" />
                Ver catálogo
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl border border-primary/30 bg-card p-8 shadow-glow">
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Premium
              </span>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-foreground">
                  R$ 9<span className="text-base text-muted-foreground">,90/mês</span>
                </div>
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground">
              BinMove Guardião
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Para quem leva sustentabilidade a sério.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow">
              Assinar Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
