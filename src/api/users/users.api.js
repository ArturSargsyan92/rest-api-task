// NPM Modules
const router = require('express').Router()

// Local Modules
// const OAuth2 = require('../../oauth2')
const { ValidationMiddleware } = require('../../middleware')
const { UsersValidationMiddleware } = ValidationMiddleware
const UsersService = require('./service/users.service')

// definitions
// const MEMBER = ['member']
// const ADMIN = ['admin']
// const ADMIN_MANAGER = ['admin', 'manager']
// const ALL_USERS = ['admin', 'manager', 'member']

router.post('/',
  UsersValidationMiddleware.validateAddUserArgs,
  UsersService.addUser)

module.exports = router
