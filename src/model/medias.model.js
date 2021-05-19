// NPM Modules
const { Model } = require('objection')

// Local Modules
const { UsersSchema } = require('./schema')

class UsersModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'users' }
  static get jsonSchema () { return UsersSchema }

  $formatJson (json) {
    json = super.$formatJson(json)
    delete json.password
    delete json.role
    return json
  }

  // Methods
  static async create (payload) {
    return UsersModel.query().insert(payload)
  }

  static async getByUsername (login) {
    return UsersModel.query().findOne({ login })
  }
}

module.exports = UsersModel
