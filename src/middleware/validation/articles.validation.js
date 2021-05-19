const { ArticlesSchema } = require('./schema')
const ValidatorUtil = require('./util/validator.util')

class ArticlesValidation {
  static validateAddArticleArgs (req, res, next) {
    ValidatorUtil.validateArgs(req, ArticlesSchema.addArticleSchema, next)
  }
}

module.exports = ArticlesValidation
