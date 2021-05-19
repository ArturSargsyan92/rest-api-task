module.exports = {
  type: 'object',
  required: ['name', 'content', 'userId', 'categoryId', 'updatedAt'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1, maxLength: 255 },
    content: { type: 'string', minLength: 1, maxLength: 2000 },
    updatedAt: { type: 'datetime' },
    userId: { type: 'integer' },
    categoryId: { type: 'integer' }
  }
}
