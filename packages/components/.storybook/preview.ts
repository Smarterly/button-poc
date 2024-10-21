import '../globals.css';
import { withThemeByClassName } from '@storybook/addon-themes';

export const decorators = [
  withThemeByClassName({
    themes: {
      cushonLight: 'cushon-light',
      cushonDark: 'cushon-dark',
      forestLight: 'forest-light',
      forestDark: 'forest-dark',
    },
    defaultTheme: 'cushonLight',
  }),
];
