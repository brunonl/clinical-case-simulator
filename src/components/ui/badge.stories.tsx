import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
    title: 'UI/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Badge para indicar status, categorias ou metadados.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline'],
            description: 'Estilo visual do badge',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Badge',
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secundário',
        variant: 'secondary',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Erro',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex gap-3 flex-wrap">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
        </div>
    ),
};

export const UsageCaseClinical: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge variant="secondary">Cardiologia</Badge>
            <Badge variant="outline">Difícil</Badge>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">90%</Badge>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemplo de uso em contexto de caso clínico',
            },
        },
    },
};
