// NPM Modules
const { Model } = require('objection')

class MediasModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'medias' }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['url', 'articleId'],
      properties: {
        id: { type: 'integer' },
        url: { type: 'string', minLength: 1, maxLength: 255 },
        articleId: { type: 'integer' }
      }
    }
  }

  // Methods
  static async create (payload) {
    return MediasModel.query().insert(payload)
  }
}

module.exports = MediasModel
