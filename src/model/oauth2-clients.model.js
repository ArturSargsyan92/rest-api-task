// NPM Modules
const { Model } = require('objection')

class OAuth2ClientsModel extends Model {
  // Props
  static get idColumn () { return 'id' }
  static get tableName () { return 'oauth2-clients' }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['clientId', 'clientSecret', 'grants'],
      properties: {
        clientId: { type: 'string', maxLength: 45 },
        clientSecret: { type: 'string', maxLength: 45 },
        grants: { type: 'string', enum: ['password'] }
      }

    }
  }

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
