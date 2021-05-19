// NPM Modules
const { Model } = require('objection')

// Local Modules
const { CategoriesSchema } = require('./schema')

class CategoriesModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'categories' }
  static get jsonSchema () { return CategoriesSchema }

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
