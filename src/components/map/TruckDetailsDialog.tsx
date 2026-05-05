import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Truck, Fuel, Calendar, Gauge, MapPin, Clock, Phone, Briefcase, Hash, Package } from "lucide-react";
import { CATEGORY_META } from "@/data/collectionPoints";
import type { TruckRoute } from "@/data/truckRoutes";

interface Props {
  truck: TruckRoute | null;
  onClose: () => void;
}

export default function TruckDetailsDialog({ truck, onClose }: Props) {
  const open = !!truck;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {truck && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${CATEGORY_META[truck.category].color}, hsl(142 76% 35%))` }}
                >
                  <Truck className="h-6 w-6 text-background" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Ficha do caminhão {truck.plate}</DialogTitle>
                  <DialogDescription>
                    Coleta de{" "}
                    <span className="font-semibold" style={{ color: CATEGORY_META[truck.category].color }}>
                      {CATEGORY_META[truck.category].label}
                    </span>{" "}
                    · Zona {truck.zone}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Operação */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Operação de hoje
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Stat icon={<Clock className="h-4 w-4" />} label="Início" value={truck.startedAt} />
                <Stat icon={<MapPin className="h-4 w-4" />} label="Coletas" value={String(truck.collectionsToday)} />
                <Stat icon={<Package className="h-4 w-4" />} label="Carga" value={`${truck.capacity}%`} />
                <Stat icon={<Hash className="h-4 w-4" />} label="Frota" value={truck.truck.fleetNumber} />
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${truck.capacity}%`, background: CATEGORY_META[truck.category].color }}
                />
              </div>
            </section>

            {/* Veículo */}
            <section className="space-y-3 rounded-xl border border-border bg-secondary/30 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Dados do veículo
              </h3>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <Field icon={<Truck className="h-4 w-4" />} label="Modelo" value={truck.truck.model} />
                <Field icon={<Calendar className="h-4 w-4" />} label="Ano" value={String(truck.truck.year)} />
                <Field icon={<Fuel className="h-4 w-4" />} label="Combustível" value={truck.truck.fuel} />
                <Field icon={<Package className="h-4 w-4" />} label="Capacidade" value={`${truck.truck.capacityKg.toLocaleString("pt-BR")} kg`} />
                <Field icon={<Gauge className="h-4 w-4" />} label="Quilometragem" value={`${truck.truck.km.toLocaleString("pt-BR")} km`} />
                <Field icon={<Calendar className="h-4 w-4" />} label="Próx. manutenção" value={new Date(truck.truck.nextMaintenance).toLocaleDateString("pt-BR")} />
              </div>
            </section>

            {/* Equipe */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Equipe a bordo ({truck.crew.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {truck.crew.map((m) => (
                  <div
                    key={m.name}
                    className="flex gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <img
                      src={m.photo}
                      alt={`Foto de ${m.name}`}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-full border border-primary/30 bg-secondary object-cover"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold leading-tight text-foreground">
                          {m.name}
                        </h4>
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {m.role}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{m.age} anos</p>
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Briefcase className="h-3 w-3" /> {m.experience} de experiência
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> Turno {m.shift}
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Phone className="h-3 w-3" /> {m.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}
