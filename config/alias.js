const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  'app-pages': resolveApp('src/pages'),
  'app-components': resolveApp('src/components')
}
