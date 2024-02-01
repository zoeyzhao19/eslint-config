import { zls } from '@zls/eslint-config';

export default zls({
  ignores: ['fixtures/input/*'],
  prettier: {
    overrides: {
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      jsxSingleQuote: false,
      endOfLine: 'lf',
    },
  },
});
