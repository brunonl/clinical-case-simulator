import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
    title: 'UI/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Barra de progresso para indicar andamento de processos.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Porcentagem de progresso (0-100)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 60,
        className: 'w-[300px]',
    },
};

export const Empty: Story = {
    args: {
        value: 0,
        className: 'w-[300px]',
    },
};

export const Complete: Story = {
    args: {
        value: 100,
        className: 'w-[300px]',
    },
};

export const QuizProgress: Story = {
    render: () => (
        <div className="w-[400px] space-y-2">
            <div className="flex-between">
                <span className="text-caption">Progresso</span>
                <span className="text-caption">4/10 Questões</span>
            </div>
            <Progress value={40} className="h-1 bg-secondary [&>div]:gradient-tile-a" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemplo de uso no contexto de progresso de quiz',
            },
        },
    },
};

export const MultipleProgresses: Story = {
    render: () => (
        <div className="w-[300px] space-y-4">
            <div>
                <p className="text-label mb-1">Cardiologia</p>
                <Progress value={85} className="h-2" />
            </div>
            <div>
                <p className="text-label mb-1">Pneumologia</p>
                <Progress value={45} className="h-2" />
            </div>
            <div>
                <p className="text-label mb-1">Neurologia</p>
                <Progress value={20} className="h-2" />
            </div>
        </div>
    ),
};
