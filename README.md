# [Unmainted] Kotori (ことり) :baby_chick:

**No longer actively maintaining this project due to lack of motivation. This project and source code keep on GitHub and on npm, but no longer maintaining in my side.**

[![Build Status](http://img.shields.io/travis/kubosho/kotori.svg)](https://travis-ci.org/kubosho/kotori)
[![Coverage Status](https://coveralls.io/repos/kubosho/kotori/badge.svg?branch=master&service=github)](https://coveralls.io/github/kubosho/kotori?branch=master)

[![npm version](https://img.shields.io/npm/v/kotori.svg)](https://www.npmjs.com/package/kotori)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](https://github.com/kubosho/kotori/blob/master/LICENSE)
[![David](https://david-dm.org/kubosho/kotori.svg)](https://david-dm.org/kubosho/kotori)

Kotori is CSS optimize tool.

Kotori seamlessly integrates the better tools: [CSSfmt](https://github.com/morishitter/cssfmt), [Autoprefixer](https://github.com/postcss/autoprefixer) and [clean-css](https://github.com/jakubpawlowicz/clean-css).

## Installation

```bash
# global install
npm install -g kotori

# local install
npm install --save-dev kotori
```

## Usage

### in CLI

```
kotori <input> -o <output> <option>
```

example:

```
# single file
kotori src/main.css -o dist/main.css

# use glob definition in input
kotori src/*.css -o dist/
```

### in Node.js module

```
const kotori = require('kotori');
kotori.source('path/to/*.css')
  .pipe(kotori.optimize({
    browsers: [ 'last 2 version', '> 5%' ],
    env: 'production'
  }))
  .pipe(kotori.output('path/to/css/'));
```

## CLI options

| name | long name | description |
| --- | --- | --- |
| - | --init | Setup config file (.kotorirc) |
| -o | --output | Specify CSS file output path |
| -v | --version | Show version |
| -h | --help | Show help |

## Configuration

| name | type | description | default value |
| --- | --- | --- | --- |
| browsers | String[] | [browserslist](https://github.com/ai/browserslist) queries. | ['last 2 version', '> 5%'] |
| env | String | if defined of "production" to minify CSS. "development" if it will not minify. | 'production' |

## Changelog

See [Releases · kubosho/kotori](https://github.com/kubosho/kotori/releases).

## License

The MIT License

Copyright (c) 2015-16 Shota Kubota
