import type { RequiredOptions as PrettierLinterOptions } from 'prettier';
import type { EslintFlatConfig } from '../types';
import { interopDefault } from '../utils';

export interface PrettierOptions {
  overrides?: PrettierLinterOptions;
}

export async function prettier(options: PrettierOptions = {}): Promise<EslintFlatConfig<object>[]> {
  const {
    overrides = {
      printWidth: 120,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      endOfLine: 'lf',
    } as PrettierLinterOptions,
  } = options;

  const eslintPluginPrettierRecommended = await interopDefault(import('eslint-plugin-prettier/recommended'));

  return [
    {
      ...eslintPluginPrettierRecommended,
      rules: {
        ...eslintPluginPrettierRecommended.rules,
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
