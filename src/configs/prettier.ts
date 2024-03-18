import type { RequiredOptions as PrettierLinterOptions } from 'prettier';
import { interopDefault } from '../utils';
import type { EslintFlatConfig } from '../types';

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
