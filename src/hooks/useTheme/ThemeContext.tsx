import React from 'react';
import { type Theme } from './ThemeProvider';
import { webColors } from './colors';

export const ThemeContext = React.createContext<Theme>(webColors);
