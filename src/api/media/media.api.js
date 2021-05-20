// NPM Modules
const router = require('express').Router()

// Local Modules
const OAuth2 = require('../../oauth2')
const { ImageUploadMiddleware } = require('../../middleware')

// definitions
const ADMIN_MANAGER = ['admin', 'manager']

router.post('/upload',
  OAuth2.authenticateFor(ADMIN_MANAGER),
  ImageUploadMiddleware.validate,
  ImageUploadMiddleware.save)

module.exports = router
