const STATS = [
  { value: "1.2M", label: "Quilos reciclados", desc: "Pelos usuários BinMove em 2025" },
  { value: "−480t", label: "CO₂ evitado", desc: "Equivalente a 24 mil árvores plantadas" },
  { value: "12k+", label: "Usuários ativos", desc: "Em mais de 30 bairros de São Paulo" },
  { value: "98%", label: "Pontualidade", desc: "Dos caminhões chegam no horário previsto" },
];

export default function Impact() {
  return (
    <section
      id="impacto"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/50 py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-green opacity-50" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Impacto coletivo
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            Cada coleta,{" "}
            <span className="bg-gradient-green bg-clip-text text-transparent">
              uma cidade mais limpa
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm"
            >
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
