// NPM Modules
const { Model } = require('objection')

class UsersModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'users' }
  static get jsonSchema () {
    return {
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
  }

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
