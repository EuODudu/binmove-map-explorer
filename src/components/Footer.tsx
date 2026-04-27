import { Trash2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Trash2 className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-bold text-primary">BinMove</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BinMove · Coleta inteligente em São Paulo
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacidade</a>
          <a href="#" className="hover:text-foreground">Termos</a>
          <a href="#" className="hover:text-foreground">Contato</a>
        </div>
      </div>
    </footer>
  );
}
