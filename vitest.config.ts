import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const storybookPlugins = await storybookTest({
  configDir: path.join(dirname, '.storybook'),
  storybookScript: 'bun run storybook -- --no-open',
})
const storybookBrowserPathFix = {
  name: 'storybook-vitest-browser-path-fix',
  enforce: 'post' as const,
  transform (code: string, id: string) {
    if (!id.includes('.stories.') || !code.includes('const _isRunningFromThisFile =')) {
      return
    }

    return code.replace(
      /const _isRunningFromThisFile = .*?;\n/s,
      'const _isRunningFromThisFile = true;\n',
    )
  },
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            setupFiles: ['./src/test/setup.ts'],
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
            exclude: ['src/**/*.stories.{ts,tsx}'],
          },
        },
        {
          extends: true,
          plugins: [
            ...storybookPlugins,
            storybookBrowserPathFix,
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{
                browser: 'chromium',
              }],
            },
          },
        },
      ],
    },
  }),
)
