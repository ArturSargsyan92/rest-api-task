const { PSQL: { URL } } = require('../config/variables.config')

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: URL
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: URL
  }
}
