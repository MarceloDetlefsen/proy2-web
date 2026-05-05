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

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      ...storybookPlugins,
      {
        name: 'storybook-vitest-browser-path-fix',
        enforce: 'post',
        transform (code, id) {
          if (!id.includes('.stories.') || !code.includes('const _isRunningFromThisFile =')) {
            return
          }

          return code.replace(
            /const _isRunningFromThisFile = .*?;\n/s,
            'const _isRunningFromThisFile = true;\n',
          )
        },
      },
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
  }),
)
