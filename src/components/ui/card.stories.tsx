import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Card composto para agrupar conteúdo relacionado. Segue o design system "Flat Dark Premium".',
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Título do Card</CardTitle>
                <CardDescription>Descrição auxiliar do conteúdo</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-body">Conteúdo principal do card. Este componente é usado para agrupar informações relacionadas.</p>
            </CardContent>
        </Card>
    ),
};

export const WithFooter: Story = {
    render: () => (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Caso Clínico</CardTitle>
                <CardDescription>Cardiologia • Nível Difícil</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-body-sm">Paciente com dor torácica súbita...</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Detalhes</Button>
                <Button variant="gradient" size="sm">Iniciar Quiz</Button>
            </CardFooter>
        </Card>
    ),
};

export const SurfaceVariants: Story = {
    render: () => (
        <div className="flex gap-4">
            <div className="surface-card p-4 w-[150px]">
                <p className="text-label">surface-card</p>
            </div>
            <div className="surface-elevated p-4 w-[150px]">
                <p className="text-label">surface-elevated</p>
            </div>
            <div className="surface-inset p-4 w-[150px]">
                <p className="text-label">surface-inset</p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Classes utilitárias de superfície para diferentes níveis de elevação',
            },
        },
    },
};

export const Interactive: Story = {
    render: () => (
        <div className="surface-interactive p-6 w-[300px] cursor-pointer">
            <p className="text-heading-3">Card Interativo</p>
            <p className="text-body-sm">Passe o mouse para ver o efeito hover</p>
        </div>
    ),
};
