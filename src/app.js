// NPM Modules
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const sentry = require('@sentry/node')

const { CORS, DISABLE_REQUEST_LOG, PORT, SENTRY_DSN } = require('./config/variables.config')

const PSQLStorage = require('./storage/psql.storage')

const ErrorHandlerMiddleware = require('./middleware/error-handler.middleware')

const PackageJson = require('../package.json')
const Api = require('./api')

class App {
  /**
   * @constructor
   */
  constructor () {
    this.app = express()
    this.port = PORT
    this.env = this.app.get('env')
  }

  /**
   * @description Initialize the App.
   */
  async init () {
    await App._initializeStorage()
    this._initErrorTracker()
    this._setRequestLogger()
    this._setCors()
    this._setRequestParser()
    this._initializeApi()
    this._setErrorTracker()
    this._setErrorHandler()
    this._initJsonReplacer()
  }

  /**
   * @private
   * @description Init error tracker.
   */
  _initErrorTracker () {
    sentry.init({
      dsn: SENTRY_DSN,
      release: PackageJson.version,
      name: PackageJson.name,
      environment: process.env.NODE_ENV
    })

    this.app.use(sentry.Handlers.requestHandler())
  }

  /**
   * @private
   * @description Set request logger.
   */
  _setRequestLogger () {
    DISABLE_REQUEST_LOG !== '1' && this.app.use(morgan('dev'))
  }

  /**
   * @private
   * @description Set Cross-origin resource sharing.
   *  Reflect any request that is coming from an origin ending with one specified in configs.
   */
  _setCors () {
    this.app.use(cors({
      origin: CORS.ORIGIN,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1
    }))
  }

  /**
   * @private
   * @description Set body parser:
   *  1. Parses the text as JSON & exposes the resulting object on req.body (limit 1 mb).
   */
  _setRequestParser () {
    const options = { limit: '200mb', extended: false }
    this.app.use(bodyParser.urlencoded(options))
  }

  /**
   * @private
   * @description Initialize storage.
   */
  static _initializeStorage () {
    return PSQLStorage.init()
  }

  /**
   * @private
   * @description Initialize API.
   */
  _initializeApi () {
    this.app.use('/api/v1', Api)
  }

  /**
   * @private
   * @description Set error tracker.
   */
  _setErrorTracker () {
    this.app.use(sentry.Handlers.errorHandler())
  }

  /**
   * @private
   * @description General error handler.
   */
  _setErrorHandler () {
    this.app.use(ErrorHandlerMiddleware.init)
  }

  /**
   * @private
   * @description Json replacer to keep date time zone
   */
  _initJsonReplacer () {
    this.app.set('json replacer', function (key, value) {
      return this[key] instanceof Date
        ? this[key].toLocaleString()
        : value
    })
  }
}

module.exports = new App()
