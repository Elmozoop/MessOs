import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ThemeProvider, useTheme } from './ThemeContext';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('provides initial dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('toggles theme back to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-theme'));
    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
