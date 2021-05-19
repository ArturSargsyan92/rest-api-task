module.exports = {
  type: 'object',
  required: ['name', 'login', 'password', 'role'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1, maxLength: 255 },
    login: { type: 'string', minLength: 1, maxLength: 255 },
    password: { type: 'string', minLength: 8, maxLength: 255 },
    role: { type: 'string', enum: ['member', 'admin', 'moderator'] }
  }
}
