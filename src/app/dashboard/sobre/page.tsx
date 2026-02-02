import { Info, Lightbulb, BookOpen, Users, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { InfoCard } from "@/components/ui/info-card";

export default function SobrePage() {
    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <PageHeader icon={Info} title="Sobre o Simulador" />

            <div className="space-y-4">
                <InfoCard
                    icon={Lightbulb}
                    title="O que é?"
                    description="O Simulador de Casos Clínicos é uma ferramenta de apoio ao ensino médico, que tem como objetivo disponibilizar um ambiente virtual para Simulação de Casos Clínicos reais, de complexidade e nível de atenção variáveis."
                    gradientClass="gradient-tile-c"
                />

                <InfoCard
                    icon={BookOpen}
                    title="Metodologia"
                    description="A plataforma utiliza uma abordagem baseada em casos para desenvolver o raciocínio clínico dos estudantes. Cada caso apresenta uma situação real, com história clínica completa, exames físicos, laboratoriais e de imagem, permitindo que o aluno desenvolva habilidades diagnósticas de forma progressiva."
                    gradientClass="gradient-tile-b"
                />

                <InfoCard
                    icon={Users}
                    title="Para Estudantes"
                    description="Praticar o raciocínio clínico em um ambiente seguro, sem riscos ao paciente. Desenvolver habilidades de anamnese, exame físico e diagnóstico diferencial."
                    gradientClass="gradient-tile-a"
                    size="sm"
                />

                <InfoCard
                    icon={Sparkles}
                    title="Para Professores"
                    description="Acompanhar o desempenho dos alunos, identificar dificuldades comuns e personalizar o ensino com base em dados objetivos de avaliação."
                    gradientClass="gradient-tile-d"
                    size="sm"
                />
            </div>
        </div>
    );
}
