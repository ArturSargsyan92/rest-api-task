// NPM Modules
const { Model } = require('objection')

// Local Modules
const { ArticlesSchema } = require('./schema')

class ArticlesModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'articles' }
  static get jsonSchema () { return ArticlesSchema }

  $formatJson (json) {
    json = super.$formatJson(json)
    delete json.password
    delete json.role
    return json
  }

  // Methods
  static async create (payload) {
    return ArticlesModel.query().insert(payload)
  }

  static async getByUsername (login) {
    return ArticlesModel.query().findOne({ login })
  }
}

module.exports = ArticlesModel
