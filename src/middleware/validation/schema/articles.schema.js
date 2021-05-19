// NPM modules
const Joi = require('joi')

const ArticlesSchema = {
  addArticleSchema: {
    body: Joi.object({
      name: Joi.string().min(1).max(255).required(),
      content: Joi.string().min(1).max(2000).required(),
      categoryId: Joi.number().min(1).required(),
      urls: Joi.array().items(Joi.string().min(1).required())
    })
  }
}

module.exports = ArticlesSchema
