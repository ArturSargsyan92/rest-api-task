// NPM modules
const Joi = require('joi')

const CategoriesSchema = {
  addCategorySchema: {
    body: Joi.object({
      name: Joi.string().min(1).max(255).required(),
      description: Joi.string().min(1).max(2000)
    })
  }
}

module.exports = CategoriesSchema
