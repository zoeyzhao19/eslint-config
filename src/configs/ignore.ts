import type { EslintFlatConfig } from '../types';

export const GLOB_IGNORES = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  // '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
];

interface IgnoreOptions {
  globIgnores?: EslintFlatConfig['ignores'];
}

export function ignores(options: IgnoreOptions = {}): EslintFlatConfig[] {
  const { globIgnores = [] } = options;

  return [
    {
      ignores: [...GLOB_IGNORES, ...globIgnores],
    },
  ];
}
