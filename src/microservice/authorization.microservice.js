const RequestPromise = require('request-promise')

const { ErrorsUtil } = require('../util')
const { MicroserviceError } = ErrorsUtil
const { MICROSERVICES: { AUTHORIZATION_HOST } } = require('../config/variables.config')

class AuthorizationMicroservice {
  /**
   * @param {string} authorization
   * returns {Promise<Object>}
   * @description Authenticate.
   */
  static async authenticate (authorization) {
    try {
      const options = {
        uri: AUTHORIZATION_HOST + '/api/v1/oauth2/authenticate',
        headers: { authorization },
        json: true
      }
      return await RequestPromise(options)
    } catch (error) {
      const { message } = error.error
      throw new MicroserviceError(message)
    }
  }
}

module.exports = AuthorizationMicroservice
