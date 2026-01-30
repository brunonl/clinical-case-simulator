
import { render, screen } from '@testing-library/react';
import { DashboardTile } from './dashboard-tile';

// Mock do ícone local para garantir controle
import { LucideIcon } from 'lucide-react';

const MockIcon = ((props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="mock-icon" {...props} />
)) as unknown as LucideIcon;

describe('DashboardTile', () => {
    it('renders correctly with given props', () => {
        const props = {
            href: '/test-route',
            letter: 'T',
            label: 'Test Tile',
            gradientClass: 'test-gradient',
            buttonLabel: 'Click Me',
            icon: MockIcon
        };

        render(<DashboardTile {...props} />);

        // Verificar se os textos principais estão presentes
        // 'T' aparece duas vezes: na letra grande e no atalho de teclado (kbd)
        expect(screen.getAllByText('T')).toHaveLength(2);
        expect(screen.getByText('Test Tile')).toBeInTheDocument();
        expect(screen.getByText('Click Me')).toBeInTheDocument();

        // Verificar se o link tem o href correto
        // O componente define role="menuitem" explicitamente
        const link = screen.getByRole('menuitem');
        expect(link).toHaveAttribute('href', '/test-route');
    });
});
