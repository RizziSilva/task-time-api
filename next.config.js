require('./server/dotenv')
const alias = require('./config/alias')
const path = require('path')

module.exports = {
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL
  },

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
