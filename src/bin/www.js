// Standard modules
const http = require('http')

// Modules from this project
const { LoggerUtil } = require('../util')
const App = require('../app')

// Constants
const { PORT } = require('../config/variables.config')
const { name, engines } = require('../../package.json')

const init = async () => {
  App.init()
  const server = http.createServer(App.app)

  const _onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const bind = typeof App.port === 'string' ? `Pipe ${App.port}` : `Port ${App.port}`
    switch (error.code) {
    case 'EACCES':
      LoggerUtil.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      LoggerUtil.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
    }
  }

  const _onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`

    LoggerUtil.info(`${name} started:`)
    LoggerUtil.info(`\tPort: ${bind}`)
    LoggerUtil.info(`\tEnvironment: ${App.env}`)
    LoggerUtil.info(`\tNode version: ${process.version}. Recommended v${engines.node}`)
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`)
  }

  server.listen(PORT)
  server.on('error', _onError)
  server.on('listening', _onListening)
}

module.exports = init().catch(console.error)
