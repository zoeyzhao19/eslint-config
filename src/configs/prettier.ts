import type { EslintFlatConfig } from '../types';
import { RequiredOptions as PrettierLinterOptions } from 'prettier';

export interface PrettierOptions {
  overrides?: PrettierLinterOptions;
}

export async function prettier(options: PrettierOptions = {}): Promise<EslintFlatConfig<PrettierLinterOptions, {}>[]> {
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
            ...options.overrides,
          },
        ],
      },
    },
  ];
}
