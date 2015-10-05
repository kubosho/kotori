import configSuitCSS from "stylelint-config-suitcss";

export default {
  browsers   : ["last 2 version", "> 5%", "Firefox ESR"],
  environment: "production",
  lintRules  : configSuitCSS,
  stats      : {
    outputFormat: "json",
    outputDir   : "stats",
    templateFile: ""
  }
}
