// Local Modules
const { ErrorsUtil, CryptoUtil, SuccessHandlerUtil } = require('../../../util')
const { UsersModel } = require('../../../model')
const { InputValidationError } = ErrorsUtil

class UsersService {
  static async addUser (request, response, next) {
    try {
      const payload = { ...request.body }
      payload.password = CryptoUtil.createHash(payload.password)
      payload.login = payload.login.toLowerCase()
      payload.role = 'member'

      const exists = await UsersModel.getByUsername(payload.login)
      if (exists) throw new InputValidationError('Duplicate entry')

      const user = await UsersModel.create(payload)
      SuccessHandlerUtil.handleAdd(response, next, user)
    } catch (error) {
      next(error)
    }
  }

  static async addModerator (request, response, next) {
    try {
      const payload = { ...request.body }
      payload.password = CryptoUtil.createHash(payload.password)
      payload.login = payload.login.toLowerCase()
      payload.role = 'moderator'

      const exists = await UsersModel.getByUsername(payload.login)
      if (exists) throw new InputValidationError('Duplicate entry')

      const user = await UsersModel.create(payload)
      SuccessHandlerUtil.handleAdd(response, next, user)
    } catch (error) {
      next(error)
    }
  }

  static async getUsers (request, response, next) {
    try {
      const users = await UsersModel.getMembers()
      SuccessHandlerUtil.handleGet(response, next, users)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersService
