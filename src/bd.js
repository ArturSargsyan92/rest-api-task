const knex = require('knex')({
  client: 'pg',
  // connection: URL,
  connection: {
    host: '127.0.0.1',
    user: 'artur',
    password: 'password123',
    database: 'mydb'
  },
  pool: {
    afterCreate: function (conn, done) {
      console.log('db test', conn)

      // in this example we use pg driver's connection API
      // conn.query('SET timezone="UTC";', function (err) {
      //     if (err) {
      //     console.log('db test', err);
      //       // first query failed, return error and don't try to make next query
      //       done(err, conn);
      //     } else {
      //       // do the second query...
      //       conn.query('SELECT set_limit(0.01);', function (err) {
      //         // if err is not falsy, connection is discarded from pool
      //         // if connection aquire was triggered by a query the error is passed to query promise
      //         done(err, conn);
      //       });
      //     }
      // });
    }
  }
})

module.exports = knex
