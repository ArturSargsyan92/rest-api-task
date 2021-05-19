// Standard Modules
const assert = require('assert')

// NPM Modules
const OAuth2Server = require('oauth2-server')

// Local Modules
const ServerOAuth2 = require('./server.oauth2')
const { ErrorsUtil: { PermissionError } } = require('../util')

class MiddlewareOAuth2 {
  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Token.
   */
  static async token (request, response, next) {
    const Request = new OAuth2Server.Request(request)
    const Response = new OAuth2Server.Response(response)

    try {
      const token = await ServerOAuth2.token(Request, Response)

      // For Swagger
      token.access_token = token.accessToken

      response.status(201).json(token)
    } catch (error) {
      next(error.inner || error)
    }
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Authenticate.
   */
  static async successAuth (request, response, next) {
    try {
      assert(response.locals.oauth2)
      return response.status(200).json(response.locals.oauth2)
    } catch (error) {
      next(error.inner || error)
    }
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Authenticate For Scopes.
   */
  static authenticateFor (accessScopes) {
    const access = accessScopes.map(u => 'access:' + u)
    return async function (request, response, next) {
      const Request = new OAuth2Server.Request(request)
      const Response = new OAuth2Server.Response(response)
      try {
        const token = await ServerOAuth2.authenticate(Request, Response)
        const scope = request.headers.scope ? request.headers.scope : token.scope
        if (!(access.includes(scope))) throw new PermissionError()
        response.locals.oauth2 = token
        next()
      } catch (error) {
        next(error.inner || error)
      }
    }
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Authenticate.
   */
  static async authenticate (request, response, next) {
    const Request = new OAuth2Server.Request(request)
    const Response = new OAuth2Server.Response(response)
    const scope = request.headers.scope

    try {
      const token = await ServerOAuth2.authenticate(Request, Response, scope)
      response.locals.oauth2 = token
      next()
    } catch (error) {
      next(error.inner || error)
    }
  }
}

module.exports = MiddlewareOAuth2
