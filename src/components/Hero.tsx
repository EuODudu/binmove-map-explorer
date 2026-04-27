import { Download, PlayCircle, Calendar, Truck, Map, Recycle, BarChart3, Gift, Hand } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border/60"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />

      <div className="container relative mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div className="space-y-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Disponível em São Paulo
          </span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Acompanhe a coleta
            <br />
            de lixo em{" "}
            <span className="bg-gradient-green bg-clip-text text-transparent">
              tempo real
            </span>
          </h1>

          <p className="max-w-xl text-base text-muted-foreground md:text-lg">
            Rastreie caminhões, ganhe pontos verdes e transforme seu impacto
            ambiental em recompensas sustentáveis.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#mapa"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-glow"
            >
              <Download className="h-5 w-5" />
              Baixar Gratuitamente
            </a>
            <a
              href="#mapa"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-primary bg-transparent px-6 py-4 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              <PlayCircle className="h-5 w-5" />
              Ver Demo
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              4 caminhões em rota agora
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              18 pontos de coleta
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              +12 mil usuários ativos
            </div>
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] animate-float">
      {/* Glow behind phone */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-gradient-radial-green opacity-80 blur-2xl" />

      <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-card">
        <div className="rounded-[2rem] border border-border/80 bg-background p-4">
          {/* Status bar */}
          <div className="mb-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>9:41</span>
            <span className="flex gap-1">
              <span className="inline-block h-1 w-3 rounded-sm bg-muted-foreground" />
              <span className="inline-block h-1 w-3 rounded-sm bg-muted-foreground" />
              <span className="inline-block h-1 w-3 rounded-sm bg-primary" />
            </span>
          </div>

          {/* Greeting */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-start gap-2">
              <Hand className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-base font-bold text-foreground">Olá, João!</div>
                <div className="text-[11px] text-muted-foreground">
                  Seja bem-vindo de volta
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
              <Recycle className="h-3 w-3" /> Guardião
            </span>
          </div>

          {/* Próxima coleta */}
          <div className="mb-2.5 rounded-2xl border border-border bg-secondary/50 p-3">
            <div className="flex items-start gap-2.5">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Próxima coleta
                </div>
                <div className="text-sm font-semibold text-foreground">
                  Terça-feira{" "}
                  <span className="text-muted-foreground font-normal">
                    14:00 - 16:00
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[60%] rounded-full bg-primary" />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  60% completado
                </div>
              </div>
            </div>
          </div>

          {/* Caminhão próximo */}
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-border bg-secondary/50 p-3">
            <div className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <div className="text-[10px] font-medium text-muted-foreground">
                  Caminhão próximo
                </div>
                <div className="text-sm font-semibold text-foreground">
                  📍 2.5 km daqui
                </div>
              </div>
            </div>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground">
              Rastrear
            </button>
          </div>

          {/* Quick grid */}
          <div className="mb-3 grid grid-cols-4 gap-2">
            {[
              { Icon: Map, label: "Pontos", color: "from-blue-500 to-cyan-500" },
              { Icon: Recycle, label: "Agendar", color: "from-green-500 to-emerald-500" },
              { Icon: BarChart3, label: "Impacto", color: "from-pink-500 to-rose-500" },
              { Icon: Gift, label: "Prêmios", color: "from-orange-400 to-yellow-400" },
            ].map(({ Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}
                >
                  <Icon className="h-5 w-5 text-background" />
                </div>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Meu impacto */}
          <div>
            <div className="mb-1.5 text-xs font-semibold text-foreground">
              Meu Impacto
            </div>
            <div className="grid grid-cols-3 gap-2">
              <ImpactStat color="#22c55e" value="25kg" label="Reciclados" icon="♻️" />
              <ImpactStat color="#3b82f6" value="-12kg" label="CO₂" icon="🌍" />
              <ImpactStat color="#ec4899" value="120" label="Pontos" icon="🎯" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactStat({
  color,
  value,
  label,
  icon,
}: {
  color: string;
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-2 text-center">
      <div className="text-base">{icon}</div>
      <div
        className="font-display text-sm font-bold"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[9px] text-muted-foreground">{label}</div>
    </div>
  );
}
