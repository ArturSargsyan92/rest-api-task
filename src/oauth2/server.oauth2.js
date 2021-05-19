const OAuth2Server = require('oauth2-server')

const { OAUTH2_ACCESS_TOKEN_LIFETIME } = require('../config/variables.config')

const ModelOAuth2 = require('./model.oauth2')

/**
 * @property {Function} server.token
 * @property {Function} server.authenticate
 */
const server = new OAuth2Server({
  model: ModelOAuth2,
  accessTokenLifetime: OAUTH2_ACCESS_TOKEN_LIFETIME
})

module.exports = server
