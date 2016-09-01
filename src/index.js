import {Glob} from 'glob'
import src from './src'

export default class Kotori {
  src (path) {
    const globber = new Glob(path)
    // glob(path, (error, files) => { src(error, files) })
  }
}
