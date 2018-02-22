'use strict';


function is_CJK(c) {
  return (c >= 0x4E00  && c <= 0x9FFF)  || // CJK_UNIFIED_IDEOGRAPHS
         (c >= 0x3400  && c <= 0x4DBF)  || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
         (c >= 0x20000 && c <= 0x2A6DF) || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
         (c >= 0x2A700 && c <= 0x2B73F) || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C
         (c >= 0x2B740 && c <= 0x2B81F) || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D
         (c >= 0x2B820 && c <= 0x2CEAF) || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E
         (c >= 0x2CEB0 && c <= 0x2EBEF) || // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F
         (c >= 0x3300  && c <= 0x33FF)  || // CJK_COMPATIBILITY
         (c >= 0xFE30  && c <= 0xFE4F)  || // CJK_COMPATIBILITY_FORMS
         (c >= 0xF900  && c <= 0xFAFF)  || // CJK_COMPATIBILITY_IDEOGRAPHS
         (c >= 0x2F800 && c <= 0x2FA1F) || // CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT
         (c >= 0x2E80  && c <= 0x2EFF)  || // CJK_RADICALS_SUPPLEMENT
         (c >= 0x31C0  && c <= 0x31EF)  || // CJK_STROKES
         (c >= 0x3000  && c <= 0x303F)  || // CJK_SYMBOLS_AND_PUNCTUATION
         (c >= 0x3200  && c <= 0x32FF)  || // ENCLOSED_CJK_LETTERS_AND_MONTHS
         (c >= 0x1F200 && c <= 0x1F2FF) || // ENCLOSED_IDEOGRAPHIC_SUPPLEMENT
         (c >= 0x2F00  && c <= 0x2FDF)  || // KANGXI_RADICALS
         (c >= 0x2FF0  && c <= 0x2FFF)  || // IDEOGRAPHIC_DESCRIPTION_CHARACTERS
         (c >= 0x3040  && c <= 0x309F)  || // HIRAGANA
         (c >= 0x30A0  && c <= 0x30FF);    // KATAKANA
}


function process_inlines(tokens) {
  var i, j, last, next, c;

  for (i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'softbreak') continue;

    // default last/next character to space
    last = next = 0x20;

    for (j = i - 1; j >= 0; j--) {
      if (tokens[j].type !== 'text') continue;

      c = tokens[j].content.charCodeAt(tokens[j].content.length - 2);
      last = tokens[j].content.charCodeAt(tokens[j].content.length - 1);

      if (last >= 0xDC00 && last <= 0xDFFF && c >= 0xD800 && c <= 0xDBFF) {
        last = tokens[j].content.codePointAt(tokens[j].content.length - 2);
      }
      break;
    }

    for (j = i + 1; j < tokens.length; j++) {
      if (tokens[j].type !== 'text') continue;

      next = tokens[j].content.codePointAt(0);
      break;
    }

    if (is_CJK(last) && is_CJK(next)) {
      tokens[i].type    = 'text';
      tokens[i].content = '';
    }
  }
}


function cjk_breaks(state) {
  for (var blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline') continue;

    process_inlines(state.tokens[blkIdx].children, state);
  }
}


module.exports = function cjk_breaks_plugin(md) {
  md.core.ruler.push('cjk_breaks', cjk_breaks);
};

// exported for test purposes
module.exports._is_CJK = is_CJK;
