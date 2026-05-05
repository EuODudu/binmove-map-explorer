import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CATEGORY_META, type WasteCategory } from "@/data/collectionPoints";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Clock, MapPinned, Route, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type SuggestionType = "ponto" | "rota";
export type SuggestionStatus = "pendente" | "em_analise" | "aprovada" | "recusada";

export interface Suggestion {
  id: string;
  type: SuggestionType;
  category: WasteCategory;
  neighborhood: string;
  address: string;
  reason: string;
  authorName: string;
  authorContact: string;
  createdAt: number;
  status: SuggestionStatus;
}

const STORAGE_KEY = "binmove.suggestions.v1";

const schema = z.object({
  type: z.enum(["ponto", "rota"]),
  category: z.enum(["reciclavel", "organico", "eletronico", "misto"]),
  neighborhood: z.string().trim().min(2, "Informe o bairro").max(80),
  address: z.string().trim().min(3, "Informe um endereço/região").max(160),
  reason: z.string().trim().min(10, "Conte um pouco mais (mín. 10 caracteres)").max(600),
  authorName: z.string().trim().min(2, "Seu nome").max(80),
  authorContact: z.string().trim().min(5, "E-mail ou telefone").max(120),
});

export function loadSuggestions(): Suggestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    return JSON.parse(raw);
  } catch {
    return SEED;
  }
}

function saveSuggestions(list: Suggestion[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const SEED: Suggestion[] = [
  {
    id: "s-seed-1",
    type: "ponto",
    category: "eletronico",
    neighborhood: "Sapopemba",
    address: "Av. Sapopemba, próx. ao nº 9000",
    reason:
      "Bairro sem ecoponto para eletrônicos. Moradores têm que ir até a Mooca.",
    authorName: "Marina S.",
    authorContact: "marina@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    status: "em_analise",
  },
  {
    id: "s-seed-2",
    type: "rota",
    category: "organico",
    neighborhood: "Brasilândia",
    address: "Região da Vila Penteado",
    reason:
      "Caminhão da coleta orgânica passa só 1x por semana, gera acúmulo nas ruas.",
    authorName: "Coletivo Verde ZN",
    authorContact: "(11) 99999-0000",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    status: "pendente",
  },
  {
    id: "s-seed-3",
    type: "ponto",
    category: "reciclavel",
    neighborhood: "Cidade Tiradentes",
    address: "Praça do Forte",
    reason: "Aprovado após análise da prefeitura — instalação prevista.",
    authorName: "Rafael L.",
    authorContact: "rafael@example.com",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    status: "aprovada",
  },
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated?: (s: Suggestion) => void;
}

export default function SuggestionDialog({ open, onOpenChange, onCreated }: Props) {
  const { toast } = useToast();
  const [type, setType] = useState<SuggestionType>("ponto");
  const [category, setCategory] = useState<WasteCategory>("reciclavel");
  const [form, setForm] = useState({
    neighborhood: "",
    address: "",
    reason: "",
    authorName: "",
    authorContact: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setErrors({});
    }
  }, [open]);

  const submit = () => {
    const parsed = schema.safeParse({ type, category, ...form });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const d = parsed.data;
    const newItem: Suggestion = {
      id: `s-${Date.now()}`,
      type: d.type,
      category: d.category,
      neighborhood: d.neighborhood,
      address: d.address,
      reason: d.reason,
      authorName: d.authorName,
      authorContact: d.authorContact,
      createdAt: Date.now(),
      status: "pendente",
    };
    const list = [newItem, ...loadSuggestions()];
    saveSuggestions(list);
    onCreated?.(newItem);
    toast({
      title: "Sugestão enviada!",
      description:
        "Nossa equipe vai analisar a região e dar retorno em até 7 dias.",
    });
    setForm({ neighborhood: "", address: "", reason: "", authorName: "", authorContact: "" });
    onOpenChange(false);
  };

  const cats = Object.keys(CATEGORY_META) as WasteCategory[];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <MapPinned className="h-5 w-5 text-primary" />
            Sugerir nova rota ou ponto de coleta
          </DialogTitle>
          <DialogDescription>
            Indique regiões mal atendidas. Cada sugestão é analisada pela equipe
            e, se aprovada, entra no mapa oficial.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tipo de sugestão
            </Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <TypeButton
                active={type === "ponto"}
                onClick={() => setType("ponto")}
                icon={<MapPinned className="h-4 w-4" />}
                label="Novo ponto de coleta"
              />
              <TypeButton
                active={type === "rota"}
                onClick={() => setType("rota")}
                icon={<Route className="h-4 w-4" />}
                label="Nova rota de caminhão"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tipo de resíduo
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {cats.map((c) => {
                const meta = CATEGORY_META[c];
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      active
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40",
                    )}
                    style={active ? { color: meta.color, borderColor: meta.color } : undefined}
                  >
                    {meta.emoji} {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Bairro"
              value={form.neighborhood}
              onChange={(v) => setForm((f) => ({ ...f, neighborhood: v }))}
              error={errors.neighborhood}
              placeholder="Ex.: Sapopemba"
            />
            <Field
              label="Endereço / referência"
              value={form.address}
              onChange={(v) => setForm((f) => ({ ...f, address: v }))}
              error={errors.address}
              placeholder="Ex.: Av. Sapopemba, 9000"
            />
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Por que essa região precisa?
            </Label>
            <Textarea
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="Descreva o problema, a quantidade de moradores impactados, etc."
              className="mt-2 min-h-[100px]"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-destructive">{errors.reason}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Seu nome"
              value={form.authorName}
              onChange={(v) => setForm((f) => ({ ...f, authorName: v }))}
              error={errors.authorName}
              placeholder="Como podemos te chamar"
            />
            <Field
              label="E-mail ou telefone"
              value={form.authorContact}
              onChange={(v) => setForm((f) => ({ ...f, authorContact: v }))}
              error={errors.authorContact}
              placeholder="Para te dar retorno"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={submit}>Enviar sugestão</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TypeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition",
        active
          ? "border-primary bg-primary/10 text-foreground shadow-glow"
          : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40",
      )}
    >
      <span className={active ? "text-primary" : ""}>{icon}</span>
      {label}
    </button>
  );
}

export function statusMeta(s: SuggestionStatus) {
  switch (s) {
    case "pendente":
      return { label: "Pendente", color: "hsl(var(--muted-foreground))", icon: Clock };
    case "em_analise":
      return { label: "Em análise", color: "#f59e0b", icon: Clock };
    case "aprovada":
      return { label: "Aprovada", color: "#22c55e", icon: CheckCircle2 };
    case "recusada":
      return { label: "Recusada", color: "#ef4444", icon: XCircle };
  }
}
