const { UsersSchema } = require('./schema')
const ValidatorUtil = require('./util/validator.util')

class UsersValidation {
  static validateAddUserArgs (req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.addUserSchema, next)
  }
}

module.exports = UsersValidation
