require('./dotenv')
const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 3000
const isRunningLocally = process.env.ENVIRONMENT === 'LOCAL'
const app = next({ dev: isRunningLocally })
const server = express()
const handle = app.getRequestHandler()

app.prepare().then(() => {
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err

    console.log(`Server listening on port ${PORT}`)
  })
})
