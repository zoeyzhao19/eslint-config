import { resolve, join } from 'node:path';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs-extra';
import { execa } from 'execa';
import fg from 'fast-glob';

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true });
});
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true });
});

describe('fixtures', () => {
  test('fixed by eslint', async () => {
    const source = resolve('fixtures/input');
    const temp = resolve('_fixtures');
    const output = resolve('fixtures/output');
    await fs.copy(source, temp, {
      filter: (src) => !src.includes('node_modules'),
    });

    await fs.writeFile(
      join(temp, 'eslint.config.js'),
      `
    import {zls} from '@zls/eslint-config';

    export default zls({});
    
    `,
    );

    await execa('eslint', ['.', '--fix'], {
      cwd: temp,
      stdio: 'pipe',
    });

    const files = await fg.glob('**/*.*', {
      cwd: temp,
      ignore: ['node_modules', 'eslint.config.js'],
    });

    await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(join(temp, file), 'utf-8');
        await expect.soft(content).toMatchFileSnapshot(join(output, file));
      }),
    );
  }, 30_000);
});
