const dotenv = require('dotenv')
const path = require('path')

const { NODE_ENV } = process.env

dotenv.config({
  path: path.resolve(process.cwd(), `environment/env.${NODE_ENV || 'local'}`)
})
