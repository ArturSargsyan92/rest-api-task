// NPM Modules
const { Model } = require('objection')

class CategoriesModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'categories' }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 2000 }
      }
    }
  }

  // Methods
  static async create (payload) {
    return CategoriesModel.query().insert(payload)
  }

  static async getAll () {
    return CategoriesModel.query()
  }

  static async getById (id) {
    return CategoriesModel.query().findById(id)
  }

  static async removeById (id) {
    return CategoriesModel.query().deleteById(id)
  }
}

module.exports = CategoriesModel
