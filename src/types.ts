import type { Linter } from 'eslint';
import type { ESLintRules as JavaScriptRules } from 'eslint/rules';
import type { RuleOptions as TypeScriptRules } from '@eslint-types/typescript-eslint/types';
import type { RequiredOptions as PrettierLinterOptions } from 'prettier';

export type RuleOptions = JavaScriptRules &
  TypeScriptRules & {
    'prettier/prettier': [PrettierLinterOptions];
  };

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#configuration-objects
 */
export interface EslintFlatConfig<P = Record<string, any>, R = RuleOptions>
  extends Omit<Linter.FlatConfig, 'rules' | 'languageOptions'> {
  rules?: R extends Record<string, any>
    ? {
        [K in keyof R]?: Linter.RuleEntry<R[K]>;
      }
    : never;
  languageOptions?: Omit<Required<Linter.FlatConfig>['languageOptions'], 'parserOptions'> & { parserOptions?: P };
}

export type Awaitable<T> = T | Promise<T>;
