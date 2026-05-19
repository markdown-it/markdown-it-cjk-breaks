'use strict'

const assert = require('node:assert')
const test = require('node:test')
const fn = require('../')

test('CJS require', () => {
  assert.ok(typeof fn === 'function')
})
