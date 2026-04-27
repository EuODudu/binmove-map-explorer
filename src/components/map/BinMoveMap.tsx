import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useEffect, useMemo, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import {
  COLLECTION_POINTS,
  CATEGORY_META,
  type WasteCategory,
  type CollectionPoint,
} from "@/data/collectionPoints";
import { TRUCK_ROUTES } from "@/data/truckRoutes";
import { createPointIcon, createTruckIcon } from "./markers";
import { useAnimatedTrucks } from "./useAnimatedTrucks";

interface BinMoveMapProps {
  activeCategories: Set<WasteCategory>;
  showTrucks: boolean;
  showRoutes: boolean;
  selectedPointId: string | null;
  selectedTruckId: string | null;
  onSelectPoint: (p: CollectionPoint | null) => void;
  onSelectTruck: (id: string | null) => void;
}

const SP_CENTER: [number, number] = [-23.5648, -46.6485];

export default function BinMoveMap({
  activeCategories,
  showTrucks,
  showRoutes,
  selectedPointId,
  selectedTruckId,
  onSelectPoint,
  onSelectTruck,
}: BinMoveMapProps) {
  const trucks = useAnimatedTrucks(TRUCK_ROUTES);
  const trucksRef = useRef(trucks);
  trucksRef.current = trucks;
  const mapRef = useRef<LeafletMap | null>(null);

  const visiblePoints = useMemo(
    () => COLLECTION_POINTS.filter((p) => activeCategories.has(p.category)),
    [activeCategories],
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let target: [number, number] | null = null;
    if (selectedPointId) {
      const p = COLLECTION_POINTS.find((x) => x.id === selectedPointId);
      target = p ? p.position : null;
    } else if (selectedTruckId) {
      const t = trucksRef.current.find((x) => x.route.id === selectedTruckId);
      target = t ? t.position : null;
    }
    if (target) map.flyTo(target, 15, { duration: 0.8 });
  }, [selectedPointId, selectedTruckId]);

  return (
    <MapContainer
      center={SP_CENTER}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
      attributionControl
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {showRoutes &&
        TRUCK_ROUTES.map((r) => {
          const isSelected = selectedTruckId === r.id;
          return (
            <Polyline
              key={r.id}
              positions={r.path}
              pathOptions={{
                color: isSelected ? "#4ade80" : "#22c55e",
                weight: isSelected ? 4 : 2.5,
                opacity: isSelected ? 0.9 : 0.45,
                dashArray: isSelected ? "8 6" : "4 8",
                className: isSelected ? "binmove-route-active" : undefined,
              }}
            />
          );
        })}

      {visiblePoints.map((p) => (
        <Marker
          key={p.id}
          position={p.position}
          icon={createPointIcon(p.category, selectedPointId === p.id)}
          eventHandlers={{
            click: () => onSelectPoint(p),
          }}
        >
          <Popup>
            <div className="min-w-[220px] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {CATEGORY_META[p.category].label}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase rounded-full px-2 py-0.5 ${
                    p.status === "aberto"
                      ? "bg-primary/20 text-primary"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <h4 className="text-base font-semibold text-foreground">{p.name}</h4>
              <p className="text-xs text-muted-foreground">{p.address}</p>
              <p className="text-xs text-muted-foreground">{p.neighborhood}</p>
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Capacidade</span>
                  <span>{p.capacity}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${p.capacity}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                ⏰ {p.hours}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {showTrucks &&
        trucks.map((t) => (
          <Marker
            key={t.route.id}
            position={t.position}
            icon={createTruckIcon(0)}
            eventHandlers={{
              click: () => onSelectTruck(t.route.id),
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Caminhão em rota
                </span>
                <h4 className="text-base font-semibold text-foreground">
                  {t.route.plate}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Motorista: {t.route.driver}
                </p>
                <p className="text-xs text-muted-foreground">
                  Tipo: {CATEGORY_META[t.route.category].label}
                </p>
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span>Capacidade</span>
                    <span>{t.route.capacity}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${t.route.capacity}%` }}
                    />
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
