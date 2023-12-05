import { fileURLToPath } from 'node:url'
import markdownit from 'markdown-it'
import generate from 'markdown-it-testgen'

import cjk_breaks from '../index.mjs'

describe('markdown-it-cjk-breaks', function () {
  const md = markdownit().use(cjk_breaks)

  generate(fileURLToPath(new URL('fixtures/cjk_breaks.txt', import.meta.url)), { header: true }, md)
})
