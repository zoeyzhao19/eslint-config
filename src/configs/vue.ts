import { interopDefault } from '../utils';
import type { EslintFlatConfig } from '../types';

export interface VueOptions {
  typescript?: boolean;
  overrides?: EslintFlatConfig['rules'];
  vueVersion?: 2 | 3;
}
export async function vue(options: VueOptions = {}): Promise<EslintFlatConfig[]> {
  const { overrides = {}, vueVersion = 3 } = options;

  const [pluginVue, parserVue] = await Promise.all([
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
  ]);

  return [
    {
      files: ['**/*.vue'],
      languageOptions: {
        parser: parserVue as any,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: options.typescript ? ((await interopDefault(import('@typescript-eslint/parser'))) as any) : null,
          sourceType: 'module',
        },
      },
      plugins: {
        vue: pluginVue,
      },
      rules: {
        ...(pluginVue.configs.base.rules as any),

        ...(vueVersion === 2
          ? {
              ...(pluginVue.configs.essential.rules as any),
              ...(pluginVue.configs['strongly-recommended'].rules as any),
              ...(pluginVue.configs.recommended.rules as any),
            }
          : {
              ...(pluginVue.configs['vue3-essential'].rules as any),
              ...(pluginVue.configs['vue3-strongly-recommended'].rules as any),
              ...(pluginVue.configs['vue3-recommended'].rules as any),
            }),

        'node/prefer-global/process': 'off',

        'vue/block-order': [
          'error',
          {
            order: ['script', 'template', 'style'],
          },
        ],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': [
          'error',
          {
            order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
          },
        ],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-indent': ['error', 2],
        'vue/html-quotes': ['error', 'double'],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

        ...overrides,
      },
    },
  ];
}
