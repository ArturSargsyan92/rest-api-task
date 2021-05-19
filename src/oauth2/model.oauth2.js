// NPM Modules

// Local Modules
const { OAuth2AccessTokensModel, UsersModel, OAuth2ClientsModel } = require('../model')
const { CryptoUtil, ErrorsUtil } = require('../util')
const { InvalidPasswordError, ResourceNotFoundError } = ErrorsUtil

class ModelOAuth2 {
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @description Get the client.
   */
  static async getClient (clientId, clientSecret) {
    try {
      const oauth2Client = await OAuth2ClientsModel.getOAuth2Client(clientId, clientSecret)

      if (!oauth2Client) {
        return Promise.reject(new ResourceNotFoundError('The specified client is not found.'))
      }

      return oauth2Client
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @param {Object} token
   * @param {Object} client
   * @param {object} user
   * @description Save the token.
   */
  static async saveToken (token, client, user) {
    const { clientId } = client
    const { accessToken, accessTokenExpiresAt } = token

    const role = user.role ? user.role.toUpperCase() : 'MEMBER'
    const scopes = ModelOAuth2.SCOPES
    const scope = role in scopes ? scopes[role] : scopes.MEMBER

    try {
      const payload = {
        accessToken, accessTokenExpiresAt, clientId, user: { id: user.id }, scope
      }
      await OAuth2AccessTokensModel.createOauth2AccessToken(payload)

      return {
        accessToken,
        accessTokenExpiresAt,
        scope,
        client: { id: clientId },
        user: { id: user.id, name: user.name }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @param {string} accessToken
   * @description Get the access token.
   */
  static async getAccessToken (accessToken) {
    try {
      const token = await OAuth2AccessTokensModel.getOauth2AccessToken(accessToken)
      if (!token) {
        return Promise.reject(new ResourceNotFoundError(`The token for ${accessToken} is not found.`))
      }

      const { accessTokenExpiresAt, clientId, user, scope } = token

      return { accessToken, accessTokenExpiresAt, scope, client: { id: clientId }, user }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @param {Object} token
   * @param {Object} scope
   * @returns {boolean}
   * @description Verify the scope.
   */
  static verifyScope (token, scope) {
    return token.scope === scope
  }

  /**
   * @param {string} username
   * @param {string} password
   * @description Get the user.
   */
  static async getUser (username, password) {
    try {
      const uname = username.toLowerCase()
      const user = await UsersModel.getByUsername(uname)
      if (!user) {
        return Promise.reject(new ResourceNotFoundError('The specified resource is not found.'))
      } else if (!CryptoUtil.isValidPassword(password, user.password)) {
        return Promise.reject(new InvalidPasswordError('The specified password is not valid.'))
      }
      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

ModelOAuth2.SCOPES = {
  ADMIN: 'access:admin',
  MODERATOR: 'access:moderator',
  MEMBER: 'access:member'
}

module.exports = ModelOAuth2
