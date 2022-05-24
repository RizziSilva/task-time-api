const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  'app-pages': resolveApp('src/pages'),
  'app-components': resolveApp('src/components'),
  'app-hooks': resolveApp('src/hooks'),
  'app-services': resolveApp('src/services'),
  'app-constants': resolveApp('src/constants'),
  'app-utils': resolveApp('src/utils')
}
