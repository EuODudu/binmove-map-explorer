import { useEffect, useState } from "react";
import { Recycle, Leaf, Lightbulb, Trash2, Truck, Route, MapPin, MapPinned, Plus, Sparkles } from "lucide-react";
import { CATEGORY_META, COLLECTION_POINTS, type WasteCategory } from "@/data/collectionPoints";
import { TRUCK_ROUTES } from "@/data/truckRoutes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SuggestionDialog, { loadSuggestions, type Suggestion } from "./SuggestionDialog";
import SuggestionsList from "./SuggestionsList";

import type { LucideIcon } from "lucide-react";

const CATEGORY_ICON: Record<WasteCategory, LucideIcon> = {
  reciclavel: Recycle,
  organico: Leaf,
  eletronico: Lightbulb,
  misto: Trash2,
};

interface MapSidebarProps {
  activeCategories: Set<WasteCategory>;
  toggleCategory: (c: WasteCategory) => void;
  showTrucks: boolean;
  setShowTrucks: (v: boolean) => void;
  showRoutes: boolean;
  setShowRoutes: (v: boolean) => void;
  showPoints: boolean;
  setShowPoints: (v: boolean) => void;
  selectedTruckId: string | null;
  onSelectTruck: (id: string | null) => void;
}

export default function MapSidebar({
  activeCategories,
  toggleCategory,
  showTrucks,
  setShowTrucks,
  showRoutes,
  setShowRoutes,
  showPoints,
  setShowPoints,
  selectedTruckId,
  onSelectTruck,
}: MapSidebarProps) {
  const cats = Object.keys(CATEGORY_META) as WasteCategory[];
  const visibleCount = COLLECTION_POINTS.filter((p) => activeCategories.has(p.category)).length;
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    setSuggestions(loadSuggestions());
  }, []);

  return (
    <aside className="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm lg:w-[340px]">
      <SuggestionDialog
        open={suggestOpen}
        onOpenChange={setSuggestOpen}
        onCreated={() => setSuggestions(loadSuggestions())}
      />
      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          Filtros
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Tipo de resíduo aceito ({visibleCount} pontos visíveis)
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {cats.map((c) => {
            const meta = CATEGORY_META[c];
            const Icon = CATEGORY_ICON[c];
            const active = activeCategories.has(c);
            return (
              <button
                key={c}
                onClick={() => toggleCategory(c)}
                className={cn(
                  "group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all",
                  active
                    ? "border-primary/50 bg-primary/10 text-foreground shadow-glow"
                    : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                  style={active ? { color: meta.color } : undefined}
                />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-border bg-secondary/40 p-3">
        <ToggleRow
          icon={<Truck className="h-4 w-4" />}
          label="Caminhões em operação"
          active={showTrucks}
          onChange={setShowTrucks}
        />
        <ToggleRow
          icon={<Route className="h-4 w-4" />}
          label="Rotas dos caminhões"
          active={showRoutes}
          onChange={setShowRoutes}
        />
        <ToggleRow
          icon={<MapPinned className="h-4 w-4" />}
          label="Pontos de coleta"
          active={showPoints}
          onChange={setShowPoints}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          Caminhões ativos
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {TRUCK_ROUTES.length} unidades em rota agora
        </p>
        <div className="mt-3 space-y-2">
          {TRUCK_ROUTES.map((t) => {
            const meta = CATEGORY_META[t.category];
            const selected = selectedTruckId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTruck(selected ? null : t.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                  selected
                    ? "border-primary/60 bg-primary/10 shadow-glow"
                    : "border-border bg-secondary/40 hover:border-primary/30",
                )}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${meta.color}, hsl(142 76% 35%))`,
                  }}
                >
                  <Truck className="h-5 w-5 text-background" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {t.plate}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                      {meta.label}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.driver} · {t.path.length} paradas
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${t.capacity}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {t.capacity}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Clique em um ponto ou caminhão para ver detalhes em tempo real.
        </span>
      </div>
    </aside>
  );
}

function ToggleRow({
  icon,
  label,
  active,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!active)}
      className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-foreground transition hover:bg-primary/5"
    >
      <span className="flex items-center gap-2">
        <span className={cn(active ? "text-primary" : "text-muted-foreground")}>
          {icon}
        </span>
        {label}
      </span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          active ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all",
            active ? "left-[18px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}
