
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary'); // Default variant
    });

    it('renders with different variants', () => {
        render(<Button variant="destructive">Delete</Button>);
        const button = screen.getByRole('button', { name: /delete/i });
        expect(button).toHaveClass('bg-destructive');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Action</Button>);

        fireEvent.click(screen.getByRole('button', { name: /action/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can function as a child component (Slot)', () => {
        render(
            <Button asChild>
                <a href="/link">Link Button</a>
            </Button>
        );
        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/link');
    });

    it('renders disabled state correctly', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:opacity-50');
    });
});
