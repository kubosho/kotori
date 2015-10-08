# Kotori (ことり) :baby_chick:

[![Build Status](http://img.shields.io/travis/kubosho/kotori.svg)](https://travis-ci.org/kubosho/kotori)
[![Build status](https://ci.appveyor.com/api/projects/status/0aionhon292p0y4q/branch/master?svg=true)](https://ci.appveyor.com/project/kubosho/kotori/branch/master)

[![npm version](https://img.shields.io/npm/v/kotori.svg)](https://www.npmjs.com/package/kotori)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](https://github.com/kubosho/kotori/blob/master/LICENSE)
[![David](https://david-dm.org/kubosho/kotori.svg)](https://david-dm.org/kubosho/kotori)

[![Code Climate](https://codeclimate.com/github/kubosho/kotori/badges/gpa.svg)](https://codeclimate.com/github/kubosho/kotori)
[![Coverage Status](https://coveralls.io/repos/kubosho/kotori/badge.svg?branch=master&service=github)](https://coveralls.io/github/kubosho/kotori?branch=master)

"Kotori" is a tool that automatically format and evaluate for CSS.

Kotori seamlessly integrates the better tools: [stylelint](https://github.com/stylelint/stylelint), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSfmt](https://github.com/morishitter/cssfmt), [clean-css](https://github.com/jakubpawlowicz/clean-css) and [StyleStats](https://github.com/t32k/stylestats).

## Installation

```bash
# global install
npm install -g kotori

# local install
npm install --save-dev kotori
```

### Usage

#### in Command Line

```bash
kotori [options] <input> -o <output>
```

Example to run "kotori" command:

```bash
# file
kotori src/main.css

# file(glob)
kotori src/*.css -o dist/

# directory
kotori src -o dist/
```

#### in Node.js modules

like [gulp](https://github.com/gulpjs/gulp) architecture.

```javascript
import Kotori from "kotori";

const kotori = new Kotori();
const config = {
  "browsers" : [
    "last 2 version",
    "> 5%",
    "Firefox ESR"
  ],
  "env"      : "production",
  "lintRules": "stylelint-config-suitcss",
  "stats"    : {
    "outputFormat": "json",
    "outputDir"   : "stats"
  }
};

kotori.src("path/to/main.css")
  .pipe(kotori.build(config))
  .pipe(kotori.dest("dist/"));
```

#### in Task Runners

TBD

## License

The MIT License

Copyright (c) 2015 Shota Kubota
