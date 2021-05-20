exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('login').notNullable()
      table.string('password').notNullable()
      table.string('role').notNullable() // TODO enum
    })
    .createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description')
    })
    .createTable('articles', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.text('content')
      table.integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .index()
      table.integer('categoryId')
        .unsigned()
        .references('id')
        .inTable('categories')
        .index()
      table.datetime('updatedAt')
    })
    .createTable('medias', (table) => {
      table.increments('id').primary()
      table.string('url')
      table.integer('articleId')
        .unsigned()
        .references('id')
        .inTable('articles')
        .index()
    })
    .createTable('oauth2-clients', (table) => {
      table.increments('id').primary()
      table.string('clientId').notNullable()
      table.string('clientSecret').notNullable()
      table.string('grants').notNullable()
    })
    .createTable('oauth2-access-tokens', (table) => {
      table.increments('id').primary()
      table.string('accessToken').notNullable()
      table.datetime('accessTokenExpiresAt').notNullable()
      table.string('clientId').notNullable()
      table.integer('user').notNullable()
      table.string('scope').notNullable()
    })
}

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('articles')
    .dropTableIfExists('users')
    .dropTableIfExists('categories')
    .dropTableIfExists('oauth2-clients')
    .dropTableIfExists('oauth2-access-tokens')
}
