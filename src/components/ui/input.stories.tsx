import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Campo de entrada de texto seguindo o design system.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search'],
        },
        placeholder: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Digite aqui...',
        type: 'text',
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="form-group w-[300px]">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="exemplo@email.com" />
        </div>
    ),
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Sua senha',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Campo desabilitado',
        disabled: true,
    },
};

export const FormUtilityClasses: Story = {
    render: () => (
        <div className="w-[300px] flex-stack">
            <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input className="form-input" placeholder="Digite seu nome" />
            </div>
            <div className="form-group">
                <label className="form-label">Observações</label>
                <textarea className="form-textarea" placeholder="Adicione observações..." />
                <span className="form-hint">Máximo 500 caracteres</span>
            </div>
            <div className="form-group">
                <label className="form-label">Campo com Erro</label>
                <input className="form-input border-destructive" placeholder="Valor inválido" />
                <span className="form-error">Este campo é obrigatório</span>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstração das classes utilitárias .form-* para formulários customizados',
            },
        },
    },
};
