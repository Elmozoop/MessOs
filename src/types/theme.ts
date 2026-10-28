/**
 * ThemeContext Type Definitions
 * Types for theme management
 */

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
