import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies base classes via cn_local', () => {
    render(<Card>Test</Card>);
    const card = screen.getByText('Test').closest('[class*="bg-[var(--card)]"]');
    expect(card).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Test</Card>);
    const card = screen.getByText('Test').closest('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Ref test</Card>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
