// NPM Modules
const router = require('express').Router()

// Local Modules
const OAuth2 = require('../../oauth2')
const { ValidationMiddleware } = require('../../middleware')
const { UsersValidationMiddleware } = ValidationMiddleware
const UsersService = require('./service/users.service')

// definitions
const ADMIN = ['admin']

router.post('/',
  UsersValidationMiddleware.validateAddUserArgs,
  UsersService.addUser)

router.post('/moderator',
  OAuth2.authenticateFor(ADMIN),
  UsersValidationMiddleware.validateAddUserArgs,
  UsersService.addModerator)

router.get('/',
  OAuth2.authenticate,
  UsersService.getUsers)

module.exports = router
