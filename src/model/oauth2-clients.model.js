// NPM Modules
const { Model } = require('objection')

// Local Modules
const { OAuth2ClientsSchema } = require('./schema')

class OAuth2ClientsModel extends Model {
  // Props
  static get idColumn () { return 'id' }
  static get tableName () { return 'oauth2-clients' }
  static get jsonSchema () { return OAuth2ClientsSchema }

  static mapForOAuth2 (data) {
    const { grants, clientId, clientSecret } = data
    return { grants: [ grants ], clientId, clientSecret }
  }
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @returns {Promise<Object>}
   * @description Get oauth2 client.
   */
  static getOAuth2Client (clientId, clientSecret) {
    const payload = { clientId, clientSecret }
    return OAuth2ClientsModel.query().findOne(payload).then(OAuth2ClientsModel.mapForOAuth2)
  }
}

module.exports = OAuth2ClientsModel
