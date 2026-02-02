import {
    HelpCircle,
    BookOpen,
    Target,
    CheckCircle,
    AlertCircle,
    Keyboard,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { InfoCard } from "@/components/ui/info-card";
import { KeyboardKey } from "@/components/ui/keyboard-key";

const HELP_STEPS = [
    { step: 1, title: "Selecione sua instituição", description: "Escolha a instituição de ensino para acessar os casos clínicos disponíveis." },
    { step: 2, title: "Escolha um caso clínico", description: "Navegue pela lista de casos e selecione o que deseja estudar." },
    { step: 3, title: "Estude o caso", description: "Leia a história clínica, examine os áudios e imagens disponíveis." },
    { step: 4, title: "Responda o desafio", description: "Teste seus conhecimentos respondendo as questões sobre o caso." },
];

const HELP_TIPS = [
    "Leia atentamente toda a história clínica antes de iniciar o quiz.",
    "Analise todas as imagens e áudios disponíveis.",
    "Revise seu desempenho após cada quiz para identificar pontos de melhoria.",
    "Pratique regularmente para desenvolver seu raciocínio clínico.",
];

const KEYBOARD_SHORTCUTS = [
    { key: "A", action: "Acessar Casos Clínicos" },
    { key: "B", action: "Acessar Desempenho" },
    { key: "C", action: "Acessar Sobre" },
    { key: "D", action: "Acessar Ajuda" },
    { key: "E", action: "Sair do Sistema" },
];

export default function AjudaPage() {
    return (
        <div className="space-y-4 p-3 md:p-4 animate-in fade-in duration-500">
            <PageHeader title="Ajuda" icon={HelpCircle} iconClassName="text-[var(--color-tile-d-from)]" />

            <div className="space-y-4">

                <InfoCard
                    icon={BookOpen}
                    title="Como usar o simulador"
                    gradientClass="gradient-tile-a"
                >
                    <div className="space-y-4 mt-2">
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
                </InfoCard>


                <InfoCard
                    icon={Keyboard}
                    title="Atalhos de Teclado"
                    gradientClass="gradient-tile-b"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                        {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-secondary/30 border border-border/50 rounded-sm"
                            >
                                <KeyboardKey size="md">{shortcut.key}</KeyboardKey>
                                <span className="text-xs text-muted-foreground">{shortcut.action}</span>
                            </div>
                        ))}
                    </div>
                </InfoCard>


                <InfoCard
                    icon={Target}
                    title="Dicas"
                    gradientClass="gradient-tile-d"
                >
                    <div className="space-y-2 mt-2">
                        {HELP_TIPS.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground text-xs">{tip}</p>
                            </div>
                        ))}
                    </div>
                </InfoCard>


                <InfoCard
                    icon={AlertCircle}
                    title="Atenção"
                    description="Após iniciar o desafio, não será possível refazer o teste. Certifique-se de ter estudado todo o caso clínico antes de prosseguir."
                    gradientClass="bg-amber-500"
                    className="border-amber-500/30"
                />
            </div>
        </div>
    );
}
