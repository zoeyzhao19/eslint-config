import type { EslintFlatConfig } from '../types';
import { toArray } from '../utils';
import type {
  RuleOptions as TypeScriptRules,
  ParserOptions as TypescriptParserOptions,
} from '@eslint-types/typescript-eslint/types';

export interface TypescriptOptions {
  overrides?: EslintFlatConfig<TypeScriptRules>['rules'];
  componentExts?: string[];
  tsconfigPath?: string;
}

const typeAwareRules: EslintFlatConfig<TypescriptParserOptions>['rules'] = {
  '@typescript-eslint/await-thenable': 'error',
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': 'error',
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  'no-implied-eval': 'off',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  'no-throw-literal': 'off',
  '@typescript-eslint/no-throw-literal': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@typescript-eslint/unbound-method': 'error',
};

export async function typescript(
  options: TypescriptOptions = {},
): Promise<EslintFlatConfig<TypescriptParserOptions>[]> {
  const { overrides, componentExts = [] } = options;

  const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined;

  const [pluginTs, parseTs] = await Promise.all([
    import('@typescript-eslint/eslint-plugin'),
    import('@typescript-eslint/parser'),
  ]);

  return [
    {
      files: ['**/*.?([cm])[jt]s?(x)'],
      // files: ['**/*.ts'],
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
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': 'error',
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        'no-loss-of-precision': 'off',
        '@typescript-eslint/no-loss-of-precision': 'error',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        ...overrides,
      },
    },
    {
      files: ['**/*.?([cm])[jt]s?(x)'],
      rules: {
        ...(tsconfigPath ? typeAwareRules : {}),
        ...overrides,
      },
    },
  ];
}
