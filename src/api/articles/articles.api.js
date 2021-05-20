// NPM Modules
const router = require('express').Router()

// Local Modules
const OAuth2 = require('../../oauth2')
const { ValidationMiddleware } = require('../../middleware')
const { ArticlesValidationMiddleware } = ValidationMiddleware
const ArticlesService = require('./service/articles.service')

// definitions
const MODERATOR = ['moderator']

router.post('/',
  OAuth2.authenticateFor(MODERATOR),
  ArticlesValidationMiddleware.validateAddArticleArgs,
  ArticlesService.addArticle)

router.get('/',
  OAuth2.authenticate,
  ArticlesService.getAll)

router.get('/:id',
  OAuth2.authenticate,
  ArticlesService.getArticle)

module.exports = router
