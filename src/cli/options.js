#!/usr/bin/env node

import optionator from "optionator";

export default optionator({
  prepend: "Usage: nozomi [options] <input (support glob pattern)> [-o] <output>",
  options: [{
    heading: "Mode configuration"
  }, {
    option     : "watch",
    alias      : "w",
    type       : "Boolean",
    description: "Watch mode for Nozomi builds"
  }, {
    heading: "Path configuration"
  }, {
    option     : "config",
    alias      : "c",
    type       : "path::String",
    description: "Use configuration from this file or shareable config"
  }, {
    option     : "output",
    alias      : "o",
    type       : "path::String",
    description: "Specify output path"
  }, {
    heading: "Miscellaneous"
  }, {
    option     : "help",
    alias      : "h",
    type       : "Boolean",
    description: "Show help"
  }, {
    option     : "version",
    alias      : "v",
    type       : "Boolean",
    description: "Show version"
  }]
});
