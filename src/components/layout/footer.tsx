import { Stethoscope } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card py-6 mt-auto">
            <div className="container flex items-center justify-center gap-2 text-muted-foreground/80">
                <Stethoscope className="w-4 h-4" />
                <p className="text-sm font-medium">Clinical Case Simulator</p>
            </div>
        </footer>
    );
}
