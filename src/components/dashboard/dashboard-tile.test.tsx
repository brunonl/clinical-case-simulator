
import { render, screen } from '@testing-library/react';
import { DashboardTile } from './dashboard-tile';

// Mock local icon to ensure control
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

        // Verify if main texts are present
        // 'T' appears twice: in the large letter and in the keyboard shortcut (kbd)
        expect(screen.getAllByText('T')).toHaveLength(2);
        expect(screen.getByText('Test Tile')).toBeInTheDocument();
        expect(screen.getByText('Click Me')).toBeInTheDocument();

        // Verify if the link has the correct href
        // The component explicitly defines role="menuitem"
        const link = screen.getByRole('menuitem');
        expect(link).toHaveAttribute('href', '/test-route');
    });
});
