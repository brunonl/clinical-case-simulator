import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Design System/Typography',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Classes de tipografia semânticas disponíveis via @apply no globals.css',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextClasses: Story = {
    render: () => (
        <div className="flex-stack">
            <div>
                <span className="text-caption mb-2 block">text-display</span>
                <p className="text-display">Simulador de Casos Clínicos</p>
            </div>
            <div className="divider" />
            <div>
                <span className="text-caption mb-2 block">text-heading-1</span>
                <h1 className="text-heading-1">Cardiologia Avançada</h1>
            </div>
            <div>
                <span className="text-caption mb-2 block">text-heading-2</span>
                <h2 className="text-heading-2">Diagnóstico Diferencial</h2>
            </div>
            <div>
                <span className="text-caption mb-2 block">text-heading-3</span>
                <h3 className="text-heading-3">Exame Físico</h3>
            </div>
            <div className="divider" />
            <div>
                <span className="text-caption mb-2 block">text-body</span>
                <p className="text-body">Paciente do sexo masculino, 55 anos, com histórico de hipertensão arterial sistêmica e diabetes mellitus tipo 2.</p>
            </div>
            <div>
                <span className="text-caption mb-2 block">text-body-sm</span>
                <p className="text-body-sm">Informação secundária ou complementar ao conteúdo principal.</p>
            </div>
            <div className="divider" />
            <div>
                <span className="text-caption mb-2 block">text-label</span>
                <span className="text-label">Campo Obrigatório</span>
            </div>
            <div>
                <span className="text-caption mb-2 block">text-caption</span>
                <span className="text-caption">CATEGORIA • SUBCATEGORIA</span>
            </div>
            <div>
                <span className="text-caption mb-2 block">text-mono</span>
                <span className="text-mono">ID: CC-2024-00542</span>
            </div>
        </div>
    ),
};

export const Hierarchy: Story = {
    render: () => (
        <div className="surface-card p-6 max-w-lg">
            <h1 className="text-heading-1 mb-2">Infarto Agudo do Miocárdio</h1>
            <p className="text-caption mb-4">CARDIOLOGIA • URGÊNCIA • DIFÍCIL</p>
            <p className="text-body mb-4">
                Paciente chega ao pronto-socorro com queixa de dor torácica intensa,
                de início súbito há 2 horas, com irradiação para membro superior esquerdo.
            </p>
            <p className="text-body-sm">
                Última atualização: 29/01/2026 às 14:32
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstração de hierarquia tipográfica em contexto real',
            },
        },
    },
};
