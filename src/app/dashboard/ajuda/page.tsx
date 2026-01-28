import {
    HelpCircle,
    BookOpen,
    Target,
    CheckCircle,
    AlertCircle,
    Keyboard,
} from "lucide-react";

export default function AjudaPage() {
    const steps = [
        {
            step: 1,
            title: "Selecione sua instituição",
            description: "Escolha a instituição de ensino para acessar os casos clínicos disponíveis.",
        },
        {
            step: 2,
            title: "Escolha um caso clínico",
            description: "Navegue pela lista de casos e selecione o que deseja estudar.",
        },
        {
            step: 3,
            title: "Estude o caso",
            description: "Leia a história clínica, examine os áudios e imagens disponíveis.",
        },
        {
            step: 4,
            title: "Responda o desafio",
            description: "Teste seus conhecimentos respondendo as questões sobre o caso.",
        },
    ];

    const tips = [
        "Leia atentamente toda a história clínica antes de iniciar o quiz.",
        "Analise todas as imagens e áudios disponíveis.",
        "Revise seu desempenho após cada quiz para identificar pontos de melhoria.",
        "Pratique regularmente para desenvolver seu raciocínio clínico.",
    ];

    const shortcuts = [
        { key: "A", action: "Acessar Casos Clínicos" },
        { key: "B", action: "Acessar Desempenho" },
        { key: "C", action: "Acessar Sobre" },
        { key: "D", action: "Acessar Ajuda" },
        { key: "E", action: "Sair do Sistema" },
    ];

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-[var(--color-tile-d-from)]" />
                <h1 className="text-2xl font-semibold text-foreground">Ajuda</h1>
            </div>

            {/* How to Use */}
            <div className="bg-card border border-border">
                <div className="h-1 gradient-tile-d" />
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 gradient-tile-a flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Como usar o simulador</h2>
                    </div>

                    <div className="space-y-6">
                        {steps.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 gradient-tile-c flex items-center justify-center text-white font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-card border border-border">
                <div className="h-1 gradient-tile-b" />
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 gradient-tile-b flex items-center justify-center">
                            <Keyboard className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Atalhos de Teclado</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-secondary/50 border border-border"
                            >
                                <kbd className="px-3 py-1.5 bg-background text-foreground font-mono font-bold text-lg border border-border">
                                    {shortcut.key}
                                </kbd>
                                <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-card border border-border">
                <div className="h-1 gradient-tile-a" />
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 gradient-tile-d flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Dicas para melhor aproveitamento</h2>
                    </div>

                    <div className="space-y-3">
                        {tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground text-sm">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Warning */}
            <div className="bg-card border border-amber-500/30">
                <div className="h-1 bg-amber-500" />
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-500 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Atenção</h3>
                            <p className="text-muted-foreground text-sm">
                                Após iniciar o desafio, não será possível refazer o teste. Certifique-se
                                de ter estudado todo o caso clínico antes de prosseguir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
