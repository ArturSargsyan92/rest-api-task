// Local Modules
const { ErrorsUtil, SuccessHandlerUtil } = require('../../../util')
const { CategoriesModel, MediasModel, ArticlesModel } = require('../../../model')
const { ResourceNotFoundError } = ErrorsUtil

const getUserId = response => response.locals.oauth2.user

class ArticlesService {
  static async addArticle (request, response, next) {
    try {
      const { categoryId, content, name, urls } = request.body

      const category = await CategoriesModel.getById(categoryId)
      if (!category) throw new ResourceNotFoundError('The given category not found')

      const userId = getUserId(response)
      const payload = { name, content, categoryId, userId, updatedAt: new Date() }

      const article = await ArticlesModel.create(payload)
      const mediasPayload = urls.map(url => { return { url, articleId: article.id } })
      await MediasModel.create(mediasPayload)

      SuccessHandlerUtil.handleAdd(response, next, article)
    } catch (error) {
      next(error)
    }
  }

  // static async remove (request, response, next) {
  //   try {
  //     const articleId = request.params.id

  //     const deleted = await ArticlesModel.removeById(articleId)
  //     if (1 !== deleted) throw new ResourceNotFoundError('The article not found')

  //     SuccessHandlerUtil.handleUpdate(response, next, { success: true })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async getArticle (request, response, next) {
    try {
      const articleId = request.params.id
      const articles = await ArticlesModel.getById(articleId)
      SuccessHandlerUtil.handleGet(response, next, articles)
    } catch (error) {
      next(error)
    }
  }

  static async getAll (request, response, next) {
    try {
      const articles = await ArticlesModel.getAll()
      SuccessHandlerUtil.handleGet(response, next, articles)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ArticlesService
