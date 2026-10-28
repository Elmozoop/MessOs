import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('glass-sage');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-slate-200');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-slate-50');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('glass-rose');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Button size="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');

    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-14');

    rerender(
      <Button size="icon">
        <span>X</span>
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('h-11', 'w-11');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });
});
