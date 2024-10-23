import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/css/cushon-light.css';
import '../src/css/cushon-dark.css';
import '../src/css/forest-light.css';
import '../src/css/forest-dark.css';

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
