# Nozomi (希) :crystal_ball:

[![Build Status](http://img.shields.io/travis/kubosho/nozomi.svg)](https://travis-ci.org/kubosho/nozomi)
[![Build status](https://ci.appveyor.com/api/projects/status/0aionhon292p0y4q/branch/master?svg=true)](https://ci.appveyor.com/project/kubosho/nozomi/branch/master)
[![Gemnasium](http://img.shields.io/gemnasium/kubosho/nozomi.svg)](https://gemnasium.com/kubosho/nozomi)
[![MIT License](http://img.shields.io/badge/license-MIT-green.svg)](https://github.com/kubosho/nozomi/blob/master/LICENSE)

**This release is before the alpha version. NOT FOR PRODUCTION USE.**

"Nozomi" is a tool that helps you write awesome CSS. 

A tool concept is like [ImageOptim](https://imageoptim.com/).

## Installation

```bash
# global install
npm install -g nozomi

# local install
npm install --save-dev nozomi
```

### Usage

#### in Command Line

```bash
nozomi [options] <input> -o <output>
```

Example to run "nozomi" command:

```bash
# file
nozomi src/main.css

# file(glob)
nozomi src/*.css -o dist/

# directory
nozomi src -o dist/
```

#### in Node.js modules

like [Gulp](https://github.com/gulpjs/gulp).

```javascript
import Nozomi from "nozomi";

const nozomi = new Nozomi();
const config = {
  environment: "development",
  browsers: "last 2 version, > 5%, Firefox ESR",
  stats: true,
  sourcemap: true
};

nozomi.src("path/to/main.css")
      .pipe(nozomi.build(config))
      .pipe(nozomi.dest("dist/"));
```

#### in Task Runners 

TBD

## License

MIT License

## Author

[kubosho_](https://github.com/kubosho) ([Twitter](https://twitter.com/kubosho_))
