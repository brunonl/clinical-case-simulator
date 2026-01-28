import {
    HelpCircle,
    BookOpen,
    Target,
    CheckCircle,
    AlertCircle,
    Keyboard,
} from "lucide-react";

import { HELP_STEPS, HELP_TIPS, KEYBOARD_SHORTCUTS } from "@/constants/help-data";

export default function AjudaPage() {

    return (
        <div className="space-y-4 p-3 md:p-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-6 h-6 text-[var(--color-tile-d-from)]" />
                <h1 className="text-xl font-semibold text-foreground">Ajuda</h1>
            </div>

            {/* Main Layout - Single Column Stack */}
            <div className="space-y-4">

                {/* How to Use */}
                <div className="bg-card border border-border overflow-hidden">
                    <div className="h-1 gradient-tile-d w-full" />
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-sm gradient-tile-a flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-base font-bold text-foreground uppercase tracking-wide">Como usar o simulador</h2>
                        </div>

                        <div className="space-y-4">
                            {HELP_STEPS.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-tile-c flex items-center justify-center text-white text-xs font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="bg-card border border-border overflow-hidden">
                    <div className="h-1 gradient-tile-b w-full" />
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-sm gradient-tile-b flex items-center justify-center">
                                <Keyboard className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-base font-bold text-foreground uppercase tracking-wide">Atalhos de Teclado</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 bg-secondary/30 border border-border/50 rounded-sm"
                                >
                                    <kbd className="px-1.5 py-0.5 bg-background text-foreground font-mono font-bold text-xs border border-border rounded-sm min-w-[24px] text-center">
                                        {shortcut.key}
                                    </kbd>
                                    <span className="text-xs text-muted-foreground">{shortcut.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-card border border-border overflow-hidden">
                    <div className="h-1 gradient-tile-a w-full" />
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-sm gradient-tile-d flex items-center justify-center">
                                <Target className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-base font-bold text-foreground uppercase tracking-wide">Dicas</h2>
                        </div>

                        <div className="space-y-2">
                            {HELP_TIPS.map((tip, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-muted-foreground text-xs">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-card border border-amber-500/30 overflow-hidden">
                    <div className="h-1 bg-amber-500 w-full" />
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-sm bg-amber-500 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wide">Atenção</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                    Após iniciar o desafio, não será possível refazer o teste. Certifique-se
                                    de ter estudado todo o caso clínico antes de prosseguir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
