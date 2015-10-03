# Kotori (ことり) :baby_chick:

[![Build Status](http://img.shields.io/travis/kubosho/kotori.svg)](https://travis-ci.org/kubosho/kotori)
[![Build status](https://ci.appveyor.com/api/projects/status/0aionhon292p0y4q/branch/master?svg=true)](https://ci.appveyor.com/project/kubosho/kotori/branch/master)
[![Code Climate](https://codeclimate.com/github/kubosho/kotori/badges/gpa.svg)](https://codeclimate.com/github/kubosho/kotori)
[![David](https://david-dm.org/kubosho/kotori.svg)](https://david-dm.org/kubosho/kotori)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](https://github.com/kubosho/kotori/blob/master/LICENSE)

**This release is before the alpha version. NOT FOR PRODUCTION USE.**

"Kotori" is a tool that helps you write awesome CSS.

A tool concept is like [ImageOptim](https://imageoptim.com/).

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

like [Gulp](https://github.com/gulpjs/gulp).

```javascript
import Kotori from "kotori";

const kotori = new Kotori();
const config = {
  environment: "development",
  browsers: "last 2 version, > 5%, Firefox ESR",
  stats: true,
  sourcemap: true
};

kotori.src("path/to/main.css")
      .pipe(kotori.build(config))
      .pipe(kotori.dest("dist/"));
```

#### in Task Runners

TBD

## License

MIT License

## Author

[kubosho_](https://github.com/kubosho) ([Twitter](https://twitter.com/kubosho_))
