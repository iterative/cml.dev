// const { isProduction } = require('../../utils') /* TODO: use s3 for production */
const localServeMiddleware = require('./local')
// const s3ServeMiddleware = require('./s3') /* TODO: use s3 for production */

module.exports = localServeMiddleware
