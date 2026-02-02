import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';
import { ArrowRight, Check, Loader2, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Botão principal do sistema com variantes e tamanhos. Usa CVA para variantes tipadas.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'gradient'],
            description: 'Estilo visual do botão',
        },
        size: {
            control: 'select',
            options: ['default', 'xs', 'sm', 'lg', 'xl', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
            description: 'Tamanho do botão',
        },
        disabled: {
            control: 'boolean',
            description: 'Estado desabilitado',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// VARIANTES
// ============================================

export const Default: Story = {
    args: {
        children: 'Botão Padrão',
        variant: 'default',
    },
};

export const Gradient: Story = {
    args: {
        children: 'Iniciar Caso',
        variant: 'gradient',
    },
    parameters: {
        docs: {
            description: {
                story: 'Variante gradiente usada para CTAs principais (ex: Iniciar Quiz)',
            },
        },
    },
};

export const Destructive: Story = {
    args: {
        children: 'Excluir',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Cancelar',
        variant: 'outline',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Opção Secundária',
        variant: 'secondary',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ação Sutil',
        variant: 'ghost',
    },
};

export const Link: Story = {
    args: {
        children: 'Ver mais',
        variant: 'link',
    },
};

// ============================================
// TAMANHOS
// ============================================

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4 flex-wrap">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparação de todos os tamanhos disponíveis',
            },
        },
    },
};

// ============================================
// COM ÍCONES
// ============================================

export const WithIcon: Story = {
    args: {
        children: (
            <>
                Próximo
                <ArrowRight className="w-4 h-4" />
            </>
        ),
        variant: 'gradient',
    },
};

export const IconButton: Story = {
    args: {
        children: <Trash2 className="w-4 h-4" />,
        variant: 'destructive',
        size: 'icon',
    },
};

export const IconSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="icon-xs" variant="outline"><Check className="w-3 h-3" /></Button>
            <Button size="icon-sm" variant="outline"><Check className="w-4 h-4" /></Button>
            <Button size="icon" variant="outline"><Check className="w-4 h-4" /></Button>
            <Button size="icon-lg" variant="outline"><Check className="w-5 h-5" /></Button>
        </div>
    ),
};

// ============================================
// ESTADOS
// ============================================

export const Loading: Story = {
    args: {
        disabled: true,
        children: (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Carregando...
            </>
        ),
    },
};

export const Disabled: Story = {
    args: {
        children: 'Indisponível',
        disabled: true,
    },
};

// ============================================
// SHOWCASE: TODAS AS VARIANTES
// ============================================

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase de todas as variantes disponíveis',
            },
        },
    },
};
