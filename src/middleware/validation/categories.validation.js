const { CategoriesSchema } = require('./schema')
const ValidatorUtil = require('./util/validator.util')

class CategoriesValidation {
  static validateAddCategoryArgs (req, res, next) {
    ValidatorUtil.validateArgs(req, CategoriesSchema.addCategorySchema, next)
  }
}

module.exports = CategoriesValidation
