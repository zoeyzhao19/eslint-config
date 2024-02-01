import type { EslintFlatConfig } from "../types";
import { toArray } from '../utils';
import type { RuleOptions as TypeScriptRules, ParserOptions as TypescriptParserOptions } from '@eslint-types/typescript-eslint/types';

export interface TypescriptOptions {
  overrides?: EslintFlatConfig<TypeScriptRules>['rules'];
  componentExts?: string[];
  tsconfigPath?: string;
}

const typeAwareRules: EslintFlatConfig<TypeScriptRules, TypescriptParserOptions>['rules'] = {
  '@typescript-eslint/await-thenable': 'error'
}

export async function typescript(options: TypescriptOptions = {}): Promise<EslintFlatConfig<TypeScriptRules, TypescriptParserOptions>[]> {
  const { overrides, componentExts = [] } = options;

  const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined;

  const [pluginTs, parseTs] = await Promise.all([
    import('@typescript-eslint/eslint-plugin'),
    import('@typescript-eslint/parser'),
  ]);
  return [
    {
      files: ['**/*.ts'],
      languageOptions: {
        parser: (parseTs.default ?? parseTs) as any,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          ...(tsconfigPath
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {}),
        },
      },
      plugins: {
        '@typescript-eslint': (pluginTs.default ?? pluginTs) as any,
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        "@typescript-eslint/ban-types": 'error',
        ...overrides,
      },
    },
    // {
    //   files: ["**/*.?([cm]?)tsx?"],
    //   rules: {
    //     ...tsconfigPath ? typeAwareRules : {},
    //     ...overrides
    //   }
    // }
  ];
}
