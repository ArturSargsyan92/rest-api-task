const Joi = require('joi')

const { ErrorsUtil } = require('../util')
const { InputValidationError } = ErrorsUtil

class Validator {
  static validateArgs (data, schema) {
    const { value, error } = Joi.validate(data, schema, Validator.OPTIONS)
    if (error) {
      const msg = error.details && error.details[0] && error.details[0].message
      throw new InputValidationError(msg)
    }
    data = value
  }
}

Validator.OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  convert: true
}

module.exports = Validator
