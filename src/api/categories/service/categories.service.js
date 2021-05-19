// Local Modules
const { ErrorsUtil, SuccessHandlerUtil } = require('../../../util')
const { CategoriesModel } = require('../../../model')
const { ResourceNotFoundError } = ErrorsUtil

class CategoriesService {
  static async addCategory (request, response, next) {
    try {
      const payload = request.body
      const category = await CategoriesModel.create(payload)
      SuccessHandlerUtil.handleAdd(response, next, category)
    } catch (error) {
      next(error)
    }
  }

  static async remove (request, response, next) {
    try {
      const categoryId = request.params.id

      const deleted = await CategoriesModel.removeById(categoryId)
      if (deleted !== 1) throw new ResourceNotFoundError('The category not found')

      SuccessHandlerUtil.handleUpdate(response, next, { success: true })
    } catch (error) {
      next(error)
    }
  }

  static async getAll (request, response, next) {
    try {
      const categories = await CategoriesModel.getAll()
      SuccessHandlerUtil.handleGet(response, next, categories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoriesService
