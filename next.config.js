require('./server/dotenv')
const alias = require('./config/alias')
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src/styles')]
  },

  webpack: config => {
    config.resolve = {
      alias: { ...(config.resolve.alias || {}), ...alias },
      extensions: ['.js', '.jsx']
    }

    return config
  }
}
