
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { AuthService } from '@/services/auth';
import { useRouter } from 'next/navigation';

// Mock do Next Navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock do AuthService
jest.mock('@/services/auth', () => ({
    AuthService: {
        signInWithPassword: jest.fn(),
        signInWithOAuth: jest.fn(),
    },
}));

// Mock de componentes visuais que podem poluir o teste
jest.mock('@/components/ui/loaders', () => ({
    FullScreenLoader: () => <div data-testid="loader">Autenticando...</div>
}));

jest.mock('@/components/auth/auth-background', () => ({
    AuthBackground: () => <div data-testid="auth-bg" />
}));

/**
 * Suíte de Testes da Página de Login
 * 
 * OBJETIVO:
 * Garantir que o fluxo crítico de autenticação funcione corretamente, protegendo o acesso
 * ao sistema e fornecendo feedback visual adequado ao usuário.
 * 
 * CENÁRIOS COBERTOS:
 * 1. Renderização inicial (Smoke Test)
 * 2. Fluxo Feliz (Login com sucesso)
 * 3. Tratamento de Erro (Feedback visual para falhas)
 * 4. Integração OAuth (Botão Google)
 */
describe('Feature: Login Page', () => {
    const mockPush = jest.fn();

    // SETUP: Limpar mocks antes de cada teste para garantir isolamento
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    /**
     * Teste de Renderização (Smoke Test)
     * Verifica se os elementos críticos da UI estão presentes,
     * garantindo que o usuário pode interagir com a página.
     */
    it('Scenario: Initial Render - displays all necessary form elements', () => {
        // Act
        render(<LoginPage />);

        // Assert - Elementos de UX essenciais
        expect(screen.getByRole('heading', { level: 2, name: /domine a/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email corporativo/i)).toBeInTheDocument(); // Acessibilidade ok
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /acessar plataforma/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continuar com google/i })).toBeInTheDocument();
    });

    /**
     * Teste de Fluxo Feliz (Happy Path)
     * Verifica se um usuário com credenciais válidas é autenticado e redirecionado.
     * Crítico para o funil de conversão/acesso.
     */
    it('Scenario: Successful Login - redirects user to dashboard', async () => {
        // Arrange
        render(<LoginPage />);
        const user = userEvent.setup();
        // Mock do serviço retornando sucesso (simula resposta 200 OK)
        (AuthService.signInWithPassword as jest.Mock).mockResolvedValueOnce({});

        // Act
        await user.type(screen.getByLabelText(/email corporativo/i), 'test@example.com');
        await user.type(screen.getByLabelText(/senha/i), 'password123');
        await user.click(screen.getByRole('button', { name: /acessar plataforma/i }));

        // Assert
        // 1. Verifica se o serviço foi chamado com os dados corretos
        await waitFor(() => {
            expect(AuthService.signInWithPassword).toHaveBeenCalledWith('test@example.com', 'password123');
        });
        // 2. Verifica o redirecionamento (Experiência do Usuário finalizada)
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    /**
     * Teste de Tratamento de Erro (Error Handling)
     * Verifica se o sistema informa o usuário sobre falhas de forma clara,
     * impedindo um estado de loading infinito ou falha silenciosa.
     */
    it('Scenario: Login Failure - displays error message and prevents redirect', async () => {
        // Arrange
        render(<LoginPage />);
        const user = userEvent.setup();
        // Mock do serviço retornando erro (simula 401 Unauthorized)
        (AuthService.signInWithPassword as jest.Mock).mockRejectedValueOnce(new Error('Auth Failed'));

        // Act
        await user.type(screen.getByLabelText(/email corporativo/i), 'test@example.com');
        await user.type(screen.getByLabelText(/senha/i), 'password123');
        await user.click(screen.getByRole('button', { name: /acessar plataforma/i }));

        // Assert
        // 1. Deve exibir mensagem de erro amigável ao usuário
        await waitFor(() => {
            expect(screen.getByText(/email ou senha incorretos/i)).toBeInTheDocument();
        });
        // 2. NÃO deve navegar para área logada
        expect(mockPush).not.toHaveBeenCalled();
    });

    /**
     * Teste de Integração OAuth
     * Verifica se o gatilho para autenticação social funciona.
     */
    it('Scenario: Social Login - initiates Google OAuth flow', async () => {
        // Arrange
        render(<LoginPage />);
        const user = userEvent.setup();

        // Act
        await user.click(screen.getByRole('button', { name: /continuar com google/i }));

        // Assert
        expect(AuthService.signInWithOAuth).toHaveBeenCalledWith('google');
    });
});
