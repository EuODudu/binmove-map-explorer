import { CATEGORY_META } from "@/data/collectionPoints";
import { MapPinned, Route } from "lucide-react";
import { statusMeta, type Suggestion } from "./SuggestionDialog";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "agora";
  if (h < 24) return `${h}h atrás`;
  const d = Math.floor(h / 24);
  return `${d}d atrás`;
}

export default function SuggestionsList({ items }: { items: Suggestion[] }) {
  if (items.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        Nenhuma sugestão ainda. Seja o primeiro!
      </p>
    );
  }
  return (
    <div className="space-y-2">
      {items.slice(0, 6).map((s) => {
        const cat = CATEGORY_META[s.category];
        const st = statusMeta(s.status);
        const Icon = s.type === "rota" ? Route : MapPinned;
        const StatusIcon = st.icon;
        return (
          <div
            key={s.id}
            className="rounded-xl border border-border bg-secondary/30 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: `${cat.color}25`, color: cat.color }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    {s.neighborhood}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.type === "rota" ? "Rota" : "Ponto"} · {cat.label}
                  </div>
                </div>
              </div>
              <span
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: `${st.color}20`, color: st.color }}
              >
                <StatusIcon className="h-3 w-3" />
                {st.label}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-[11px] text-muted-foreground">
              {s.reason}
            </p>
            <div className="mt-1 text-[10px] text-muted-foreground/70">
              {s.authorName} · {timeAgo(s.createdAt)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
