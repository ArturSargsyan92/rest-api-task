module.exports = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1, maxLength: 255 },
    description: { type: 'string', minLength: 1, maxLength: 2000 }
  }
}
