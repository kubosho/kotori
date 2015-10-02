"use strict";

import gulp from "gulp";
import Nozomi from "nozomi";

const nozomi = new Nozomi();

// directory setttings
import fs from "fs";
const dir = JSON.parse(fs.readFileSync("./directory-settings.json"));

gulp.task("build:product", () => {
    return gulp.src(`${dir.src}/test.css`)
        .pipe(nozomi.build())
        .pipe(gulp.dest(dir.dest))
});

gulp.task("default", ["build:product"]);
