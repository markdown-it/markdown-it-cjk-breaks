'use strict';


var assert      = require('assert');
var path        = require('path');
var markdownit  = require('markdown-it');
var generate    = require('markdown-it-testgen');
var cjk_breaks  = require('..');


describe('markdown-it-cjk-breaks', function () {
  var md = markdownit().use(cjk_breaks);

  generate(path.join(__dirname, 'fixtures/cjk_breaks.txt'), { header: true }, md);

  describe('is_CJK', function () {
    it('CJK characters', function () {
      var cjk     = Array.from('一倀㐀𠀀𪜀𫝀𫠠𬺰㌀︰豈丽⺀㇀、㈀🈀⼀⿰いイ');

      cjk.forEach(function (c) {
        assert(cjk_breaks._is_CJK(c.codePointAt(0)), c.codePointAt(0).toString(16));
      });
    });

    it('non-CJK characters', function () {
      var non_cjk = Array.from('A0Ａ０');

      non_cjk.forEach(function (c) {
        assert(!cjk_breaks._is_CJK(c.codePointAt(0)), c.codePointAt(0).toString(16));
      });
    });
  });
});
