import type { Linter } from 'eslint';

// type DefaultParserOptions = 

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#configuration-objects
 */
export interface EslintFlatConfig<R = {}, P = {}> extends Omit<Linter.FlatConfig, 'rules' | 'languageOptions'> {
  rules?: R extends Record<string, any>
    ? {
        [K in keyof R]?: Linter.RuleEntry<R[K]>;
      }
    : never;
  languageOptions?: Omit<Required<Linter.FlatConfig>['languageOptions'], 'parserOptions'> & { parserOptions?: P }
}
