import { lazy, Suspense, useState } from "react";
import { CATEGORY_META, type WasteCategory, type CollectionPoint, COLLECTION_POINTS } from "@/data/collectionPoints";
import { TRUCK_ROUTES } from "@/data/truckRoutes";
import MapSidebar from "./MapSidebar";
import { Recycle, Truck, Leaf, MapPinned } from "lucide-react";

const BinMoveMap = lazy(() => import("./BinMoveMap"));

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as WasteCategory[];

export default function MapSection() {
  const [activeCategories, setActiveCategories] = useState<Set<WasteCategory>>(
    new Set(ALL_CATEGORIES),
  );
  const [showTrucks, setShowTrucks] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null);
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);

  const toggleCategory = (c: WasteCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <section
      id="mapa"
      className="relative scroll-mt-24 border-t border-border/50 bg-background py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <MapPinned className="h-3.5 w-3.5" />
            Mapa interativo · São Paulo
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            A coleta da cidade,{" "}
            <span className="bg-gradient-green bg-clip-text text-transparent">
              em tempo real
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Visualize todos os pontos de coleta de São Paulo, acompanhe os
            caminhões em operação e descubra a rota mais próxima de você.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="relative h-[560px] overflow-hidden rounded-2xl border border-border bg-card shadow-card md:h-[640px]">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  Carregando mapa…
                </div>
              }
            >
              <BinMoveMap
                activeCategories={activeCategories}
                showTrucks={showTrucks}
                showRoutes={showRoutes}
                selectedPointId={selectedPoint?.id ?? null}
                selectedTruckId={selectedTruckId}
                onSelectPoint={setSelectedPoint}
                onSelectTruck={setSelectedTruckId}
              />
            </Suspense>

            {/* Floating legend */}
            <div className="pointer-events-none absolute left-4 top-4 z-[400] hidden md:block">
              <div className="rounded-xl border border-border bg-card/85 px-3 py-2 text-[11px] backdrop-blur-md">
                <div className="font-semibold uppercase tracking-widest text-primary">
                  Legenda
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                  {ALL_CATEGORIES.map((c) => (
                    <div key={c} className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: CATEGORY_META[c].color }}
                      />
                      <span className="text-muted-foreground">
                        {CATEGORY_META[c].label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:h-[640px]">
            <MapSidebar
              activeCategories={activeCategories}
              toggleCategory={toggleCategory}
              showTrucks={showTrucks}
              setShowTrucks={setShowTrucks}
              showRoutes={showRoutes}
              setShowRoutes={setShowRoutes}
              selectedTruckId={selectedTruckId}
              onSelectTruck={setSelectedTruckId}
            />
          </div>
        </div>

        {/* Stat bar */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            icon={<MapPinned className="h-5 w-5" />}
            value={COLLECTION_POINTS.length.toString()}
            label="Pontos ativos"
          />
          <StatCard
            icon={<Truck className="h-5 w-5" />}
            value={TRUCK_ROUTES.length.toString()}
            label="Caminhões em rota"
          />
          <StatCard
            icon={<Recycle className="h-5 w-5" />}
            value="2.4t"
            label="Coletado hoje"
          />
          <StatCard
            icon={<Leaf className="h-5 w-5" />}
            value="-840kg"
            label="CO₂ evitado"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition hover:border-primary/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
        {icon}
      </div>
      <div>
        <div className="font-display text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
