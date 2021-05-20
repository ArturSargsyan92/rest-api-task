// NPM Modules
const { Model } = require('objection')

class OAuth2AccessTokensModel extends Model {
  // Props
  static get idColumn () { return 'id' }
  static get tableName () { return 'oauth2-access-tokens' }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['accessToken', 'accessTokenExpiresAt', 'clientId', 'user', 'scope'],
      properties: {
        accessToken: { type: 'string', maxLength: 60 }, // TODO unique
        accessTokenExpiresAt: { type: 'datetime' },
        clientId: { type: 'string', maxLength: 45 },
        user: { type: 'integer' },
        scope: { type: 'string' }
      }
    }
  }

  /**
   * @param {Object} payload
   * @returns {Promise<Object>}
   * @description Create oauth2 access token.
   */
  static createOauth2AccessToken (payload) {
    const { accessToken, accessTokenExpiresAt, clientId, user: { id: user }, scope } = payload
    const docs = { accessToken, accessTokenExpiresAt, clientId, user, scope }

    return OAuth2AccessTokensModel.query().insert(docs)
  }

  /**
   * @param {string} accessToken
   * @returns {Promise<Object>}
   * @description Get oauth2 access token.
   */
  static getOauth2AccessToken (accessToken) {
    const payload = { accessToken }

    return OAuth2AccessTokensModel.query().findOne(payload)
  }
}

module.exports = OAuth2AccessTokensModel
