# markdown-it-cjk-breaks

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-cjk-breaks/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-cjk-breaks)
[![NPM version](https://img.shields.io/npm/v/markdown-it-cjk-breaks.svg?style=flat)](https://www.npmjs.org/package/markdown-it-cjk-breaks)
[![Coverage Status](https://coveralls.io/repos/markdown-it/markdown-it-cjk-breaks/badge.svg?branch=master&service=github)](https://coveralls.io/github/markdown-it/markdown-it-cjk-breaks?branch=master)

> Plugin for [markdown-it](https://github.com/markdown-it/markdown-it) that suppresses linebreaks between asian characters.

Normally newlines in a markdown text get rendered as newlines in output html text. Then browser will render those newlines as whitespace as per html spec. This plugin finds and removes newlines occuring between two east asian characters to prevent undesirable whitespace.


## Install

```bash
yarn add markdown-it-cjk-breaks
```


## Usage

```js
var md = require('markdown-it')();
var cjk_breaks = require('markdown-it-cjk-breaks');

md.use(cjk_breaks);

md.render(`
あおえ
うい
aoe
ui
`);

// returns:
//
//<p>あおえうい
//aoe
//ui</p>
```


## License

[MIT](https://github.com/markdown-it/markdown-it-cjk-breaks/blob/master/LICENSE)
