import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E86AB',
    secondary: '#A23B72',
    accent: '#F18F01',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
    placeholder: '#7F8C8D',
    disabled: '#BDC3C7',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

export type Theme = typeof theme;