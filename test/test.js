'use strict';


var path        = require('path');
var markdownit  = require('markdown-it');
var generate    = require('markdown-it-testgen');
var cjk_breaks  = require('..');


describe('markdown-it-cjk-breaks', function () {
  var md = markdownit().use(cjk_breaks);

  generate(path.join(__dirname, 'fixtures/cjk_breaks.txt'), { header: true }, md);
});
