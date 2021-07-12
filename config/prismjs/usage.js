/* eslint-env node */

const Prism = require('prismjs')

Prism.languages.usage = {
  usage: {
    pattern: /(^|\n)\s*(usage|positional arguments|optional arguments)/
  }
}
