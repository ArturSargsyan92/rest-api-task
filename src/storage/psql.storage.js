// Local Modules
const knexConfigs = require('./knex.configs')
const { LoggerUtil } = require('../util')
const { Model } = require('objection')

// NPM Modules
const knex = require('knex')

class PSQLStorage {
  static async init () {
    try {
      const options = process.env.NODE_ENV === 'production'
        ? knexConfigs.production
        : knexConfigs.development
      const pg = knex(options)
      await pg.raw('SELECT 1;')
      Model.knex(pg)
      LoggerUtil.info('PSQL Connected...')
    } catch (error) {
      LoggerUtil.error(error.message)
    }
  }
}

module.exports = PSQLStorage
