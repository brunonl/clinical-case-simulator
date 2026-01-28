import { Info, Lightbulb, BookOpen, Users, Sparkles, Building2 } from "lucide-react";

export default function SobrePage() {
    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Info className="w-8 h-8 text-muted-foreground" />
                <h1 className="text-2xl font-semibold text-foreground">Sobre o Simulador</h1>
            </div>

            {/* Main Description Card */}
            <div className="bg-card border border-border">
                <div className="h-1 gradient-tile-c" />
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-tile-c flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-3">O que é?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                O <strong className="text-foreground">Simulador de Casos Clínicos</strong> é uma ferramenta
                                de apoio ao ensino médico, que tem como objetivo disponibilizar um ambiente virtual
                                para Simulação de Casos Clínicos reais, de complexidade e nível de atenção variáveis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Methodology Card */}
            <div className="bg-card border border-border">
                <div className="h-1 gradient-tile-b" />
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-tile-b flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Metodologia</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                A plataforma utiliza uma abordagem baseada em casos para desenvolver o raciocínio
                                clínico dos estudantes. Cada caso apresenta uma situação real, com história clínica
                                completa, exames físicos, laboratoriais e de imagem, permitindo que o aluno
                                desenvolva habilidades diagnósticas de forma progressiva.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Objectives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Objective 1 */}
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-a" />
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 gradient-tile-a flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-foreground">Para Estudantes</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Praticar o raciocínio clínico em um ambiente seguro, sem riscos ao paciente.
                            Desenvolver habilidades de anamnese, exame físico e diagnóstico diferencial.
                        </p>
                    </div>
                </div>

                {/* Objective 2 */}
                <div className="bg-card border border-border">
                    <div className="h-1 gradient-tile-d" />
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 gradient-tile-d flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-foreground">Para Professores</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Acompanhar o desempenho dos alunos, identificar dificuldades comuns e
                            personalizar o ensino com base em dados objetivos de avaliação.
                        </p>
                    </div>
                </div>
            </div>




            {/* CINS Card */}
            <div className="bg-card border-border overflow-hidden group hover:border-[var(--color-tile-e-to)]/50 transition-colors border">
                <div className="h-1 gradient-tile-e" />
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-[var(--color-tile-e-to)]" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Desenvolvido por CINS
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 p-4 border border-white/10">
                            <div className="w-12 h-12 flex items-center justify-center text-sm font-bold text-[var(--color-tile-e-to)]">
                                CINS
                            </div>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Centro de Informática em Saúde da Faculdade de Medicina da UFMG.
                                <br />
                                Compromisso com o ensino médico e inovação tecnológica.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
