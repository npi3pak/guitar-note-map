import React from 'react';
import { ThemeContext } from './ThemeContext';
import type { m4lColors, webColors } from './colors';

export type Theme = typeof webColors | typeof m4lColors;

export const ThemeProvider: React.FC<{ theme: Theme; children: React.ReactNode }> = ({ theme, children }) => {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
