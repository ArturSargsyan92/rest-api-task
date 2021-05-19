// NPM modules
const Joi = require('joi')

const UsersSchema = {
  addUserSchema: {
    body: Joi.object({
      login: Joi.string().min(1).max(255).required(),
      name: Joi.string().min(1).max(255).required(),
      password: Joi.string().min(8).max(255).required()
    })
  }
}

module.exports = UsersSchema
