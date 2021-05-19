module.exports = {
  type: 'object',
  required: ['clientId', 'clientSecret', 'grants'],
  properties: {
    clientId: { type: 'string', maxLength: 45 },
    clientSecret: { type: 'string', maxLength: 45 },
    grants: { type: 'string', enum: ['password'] }
  }
}
