import type { RequiredOptions as PrettierLinterOptions } from 'prettier';
import type { EslintFlatConfig } from '../types';

export interface PrettierOptions {
  overrides?: PrettierLinterOptions;
}

export async function prettier(
  options: PrettierOptions = {},
): Promise<EslintFlatConfig<object, PrettierLinterOptions>[]> {
  const {
    overrides = {
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      jsxSingleQuote: false,
      endOfLine: 'lf',
    },
  } = options;

  const eslintPluginPrettierRecommended = await import('eslint-plugin-prettier/recommended');

  return [
    {
      ...eslintPluginPrettierRecommended,
      rules: {
        ...eslintPluginPrettierRecommended.rules,
        // TODO type inference
        'prettier/prettier': [
          'error',
          {
            ...overrides,
          },
        ],
      },
    },
  ];
}
