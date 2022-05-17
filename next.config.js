require('./server/dotenv')
const alias = require('./config/alias')

module.exports = {
  webpack: config => {
    config.resolve = {
      alias: { ...(config.resolve.alias || {}), ...alias },
      extensions: ['.js', '.jsx']
    }

    return config
  }
}
