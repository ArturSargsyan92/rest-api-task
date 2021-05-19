const router = require('express').Router()
const OAuth2 = require('../../oauth2')

router.post('/token', OAuth2.token)
router.get('/authenticate', OAuth2.authenticate, OAuth2.successAuth)

module.exports = router
