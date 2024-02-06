import { isPackageExists } from 'local-pkg';
import type { EslintFlatConfig } from '../types';
import type { PrettierOptions } from './prettier';
import type { JavascriptOptions } from './javascript';
import { prettier } from './prettier';
import type { TypescriptOptions } from './typescript';
import { javascript } from './javascript';
import { ignores } from './ignore';
import { typescript } from './typescript';
import { imports } from './imports';
import { vue, type VueOptions } from './vue';

interface Options {
  prettier?: boolean | PrettierOptions;
  javascript?: JavascriptOptions;
  ignores?: EslintFlatConfig['ignores'];
  typescript?: TypescriptOptions;
  vue?: VueOptions;
}

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli'];

export async function zls(options: Options = {}): Promise<EslintFlatConfig[]> {
  const {
    ignores: globIgnores,
    prettier: enablePrettier,
    typescript: enableTypescript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
  } = options;

  const configs: EslintFlatConfig[][] = [];

  if (ignores) {
    configs.push(ignores({ globIgnores }));
  }

  // prettier默认关闭了其他插件（typescript, vue等）部分可能存在冲突的样式规则，
  // 虽然大部分情况下不会再产生冲突，但是仍将prettier插件优先应用，才能允许后续插件重新打开自己的样式规则（不至于被覆盖）
  // 如果插件重新打开的样式规则与prettier产生冲突，则建议关闭，以prettier样式规则为准 （因为prettier比较固执，可能无法关闭）。
  const prettierOptions = enablePrettier === false ? false : typeof enablePrettier === 'object' ? enablePrettier : {};
  if (prettierOptions) {
    configs.push(
      await prettier({
        ...prettierOptions,
      }),
    );
  }

  configs.push(javascript(options.javascript));

  const typescriptOptions =
    enableTypescript === false ? false : typeof enableTypescript === 'object' ? enableTypescript : {};
  if (typescriptOptions) {
    configs.push(await typescript(typescriptOptions));
  }

  const vueOptions = enableVue === false ? false : typeof enableVue === 'object' ? enableVue : {};
  if (vueOptions) {
    configs.push(
      await vue({
        ...vueOptions,
        typescript: !!enableTypescript,
      }),
    );
  }

  configs.push(await imports());

  return configs.flat();
}
