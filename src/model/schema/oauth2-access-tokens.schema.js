module.exports = {
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
