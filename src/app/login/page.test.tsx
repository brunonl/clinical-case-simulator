
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { AuthService } from '@/services/auth';
import { useRouter } from 'next/navigation';

// Mock Next Navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock AuthService
jest.mock('@/services/auth', () => ({
    AuthService: {
        signInWithPassword: jest.fn(),
        signInWithOAuth: jest.fn(),
    },
}));

// Mock visual components that might pollute the test
jest.mock('@/components/ui/loaders', () => ({
    FullScreenLoader: () => <div data-testid="loader">Autenticando...</div>
}));

jest.mock('@/components/auth/auth-background', () => ({
    AuthBackground: () => <div data-testid="auth-bg" />
}));

/**
 * Login Page Test Suite
 * 
 * OBJECTIVE:
 * Ensure the critical authentication flow works correctly, protecting access
 * to the system and providing adequate visual feedback to the user.
 * 
 * COVERED SCENARIOS:
 * 1. Initial Render (Smoke Test)
 * 2. Happy Path (Successful login)
 * 3. Error Handling (Visual feedback for failures)
 * 4. OAuth Integration (Google Button) - Temporarily disabled
 */
describe('Feature: Login Page', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    /**
     * Render Test (Smoke Test)
     * Verifies if critical UI elements are present,
     * ensuring the user can interact with the page.
     */
    it('Scenario: Initial Render - displays all necessary form elements', () => {
        render(<LoginPage />);

        expect(screen.getByRole('heading', { level: 2, name: /domine a/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email corporativo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /acessar plataforma/i })).toBeInTheDocument();
        // expect(screen.getByRole('button', { name: /continuar com google/i })).toBeInTheDocument();
    });

    /**
     * Happy Path Test
     * Verifies if a user with valid credentials is authenticated and redirected.
     * Critical for the conversion/access funnel.
     */
    it('Scenario: Successful Login - redirects user to dashboard', async () => {
        render(<LoginPage />);
        const user = userEvent.setup();
        (AuthService.signInWithPassword as jest.Mock).mockResolvedValueOnce({});

        await user.type(screen.getByLabelText(/email corporativo/i), 'test@example.com');
        await user.type(screen.getByLabelText(/senha/i), 'password123');
        await user.click(screen.getByRole('button', { name: /acessar plataforma/i }));

        await waitFor(() => {
            expect(AuthService.signInWithPassword).toHaveBeenCalledWith('test@example.com', 'password123');
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    /**
     * Error Handling Test
     * Verifies if the system informs the user about failures clearly,
     * preventing an infinite loading state or silent failure.
     */
    it('Scenario: Login Failure - displays error message and prevents redirect', async () => {
        render(<LoginPage />);
        const user = userEvent.setup();
        (AuthService.signInWithPassword as jest.Mock).mockRejectedValueOnce(new Error('Auth Failed'));

        await user.type(screen.getByLabelText(/email corporativo/i), 'test@example.com');
        await user.type(screen.getByLabelText(/senha/i), 'password123');
        await user.click(screen.getByRole('button', { name: /acessar plataforma/i }));

        await waitFor(() => {
            expect(screen.getByText(/email ou senha incorretos/i)).toBeInTheDocument();
        });

        expect(mockPush).not.toHaveBeenCalled();
    });

    /**
     * OAuth Integration Test
     * Verifies if the trigger for social authentication works.
     * Temporarily disabled while Google login is fixed.
     */
    /*
    it('Scenario: Social Login - initiates Google OAuth flow', async () => {
        render(<LoginPage />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /continuar com google/i }));

        expect(AuthService.signInWithOAuth).toHaveBeenCalledWith('google');
    });
    */
});
