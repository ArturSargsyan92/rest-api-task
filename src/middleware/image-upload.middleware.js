// Standard modules
const fs = require('fs')
const uuidv1 = require('uuid/v1')

// Local modules
const { DIMENSIONS, UPLOAD_FOLDER, UPLOAD_PREFIX } = require('../config/variables.config')
const { ImageUtil, SuccessHandlerUtil, ErrorsUtil } = require('../util')

const {
  InputValidationError
} = ErrorsUtil

class ImageUploadMiddleware {
  static async save (request, response, next) {
    try {
      const { files } = request
      const images = (files.file instanceof Array) ? files.file : [ files.file ]
      const tasks = images.map(async (img) => {
        const ext = img.mimetype.split('/')[1]
        const fileName = uuidv1() + '.' + ext
        const data = await ImageUtil.resize(img.data, DIMENSIONS)
        fs.writeFileSync(UPLOAD_FOLDER + '/' + fileName, data.buffer)
        const url = UPLOAD_PREFIX + '/' + fileName
        return url
      })
      const urls = await Promise.all(tasks)
      SuccessHandlerUtil.handleAdd(response, next, urls)
    } catch (error) {
      next(error)
    }
  }

  static validate (request, response, next) {
    const { files } = request
    if (!files) return next(new InputValidationError('No Images Found!'))
    const images = (files.file instanceof Array) ? files.file : [ files.file ]
    if (images.some(f => f.mimetype.split('/')[0] !== 'image')) {
      return next(new InputValidationError('File Format Error!'))
    }
    next()
  }
}

module.exports = ImageUploadMiddleware
