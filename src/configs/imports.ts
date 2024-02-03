import type { EslintFlatConfig } from '../types';
import { pluginImport } from '../plugins';

export async function imports(): Promise<EslintFlatConfig[]> {
  return [
    {
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',
        'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
      },
    },
  ];
}
