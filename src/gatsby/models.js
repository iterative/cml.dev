const markdownContent = require('./models/markdown-content')
const docs = require('./models/docs')
const imageSourcePaths = require('./models/image-source-paths')
const github = require('./models/github')
const pruneCache = require('./models/prune-cache')

const models = [
  markdownContent,
  docs,
  imageSourcePaths,
  github,
  pruneCache
]

module.exports = models
