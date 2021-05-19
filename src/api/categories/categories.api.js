// NPM Modules
const router = require('express').Router()

// Local Modules
const OAuth2 = require('../../oauth2')
const { ValidationMiddleware } = require('../../middleware')
const { CategoriesValidationMiddleware } = ValidationMiddleware
const CategoriesService = require('./service/categories.service')

// definitions
const ADMIN_MODERATOR = ['admin', 'moderator']
const ADMIN = ['admin']

router.post('/',
  OAuth2.authenticateFor(ADMIN_MODERATOR),
  CategoriesValidationMiddleware.validateAddCategoryArgs,
  CategoriesService.addCategory)

router.get('/',
  OAuth2.authenticate,
  CategoriesService.getAll)

router.delete('/:id',
  OAuth2.authenticateFor(ADMIN),
  CategoriesService.remove)

module.exports = router
