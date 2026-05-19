import assert from 'node:assert/strict'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import markdownit from 'markdown-it'
import testgen from 'markdown-it-testgen'

import cjk_breaks from '../index.mjs'

const md = markdownit().use(cjk_breaks)
const fixturesPath = fileURLToPath(new URL('fixtures/cjk_breaks.txt', import.meta.url))

testgen.load(fixturesPath, { header: true }, data => {
  data.meta = data.meta || {}

  const parentTest = data.meta.skip ? test.skip : test
  const desc = data.meta.desc || data.file

  parentTest(desc, async t => {
    for (const fixture of data.fixtures) {
      const name = fixture.header || `line ${fixture.first.range[0] - 1}`

      await t.test(name, () => {
        assert.strictEqual(md.render(fixture.first.text), fixture.second.text)
      })
    }
  })
})
