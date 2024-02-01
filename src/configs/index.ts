import { javascript } from './javascript';
import { prettier } from './prettier';
import type { EslintFlatConfig } from '../types';
import type { JavascriptOptions } from './javascript';
import type { PrettierOptions } from './prettier';
import { isPackageExists } from 'local-pkg';
import { ignores } from './ignore';
import type { TypescriptOptions } from './typescript';
import { typescript } from './typescript';

interface Options {
  prettier?: boolean | PrettierOptions;
  javascript?: JavascriptOptions;
  ignores?: EslintFlatConfig['ignores'];
  typescript?: TypescriptOptions;
}

export async function zls(options: Options): Promise<EslintFlatConfig[]> {
  const {
    ignores: globIgnores,
    prettier: enablePrettier,
    typescript: enableTypescript = isPackageExists('typescript'),
  } = options;
  const configs: EslintFlatConfig[][] = [];

  if (ignores) {
    configs.push(ignores({ globIgnores }));
  }

  configs.push(javascript(options.javascript));

  const prettierOptions = enablePrettier === false ? false : typeof enablePrettier === 'object' ? enablePrettier : {};
  if (prettierOptions) {
    configs.push(await prettier(prettierOptions));
  }

  const typescriptOptions =
    enableTypescript === false ? false : typeof enableTypescript === 'object' ? enableTypescript : {};
  if (typescriptOptions) {
    configs.push(await typescript(typescriptOptions));
  }

  return configs.flat();
}
