const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const oauth2 = require('./oauth2/oauth2.api')
const users = require('./users/users.api')
const categories = require('./categories/categories.api')
const articles = require('./articles/articles.api')

app.use('/oauth2', bodyParser.json(), oauth2)
app.use('/users', bodyParser.json(), users)
app.use('/categories', bodyParser.json(), categories)
app.use('/articles', bodyParser.json(), articles)

module.exports = app
