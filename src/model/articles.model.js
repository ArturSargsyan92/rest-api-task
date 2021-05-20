// NPM Modules
const { Model } = require('objection')

// Local Modules
const UsersModel = require('./users.model')
const CategoriesModel = require('./categories.model')
const MediasModel = require('./medias.model')

class ArticlesModel extends Model {
  static get idColumn () { return 'id' }
  static get tableName () { return 'articles' }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'content', 'userId', 'categoryId', 'updatedAt'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        content: { type: 'string', minLength: 1, maxLength: 2000 },
        updatedAt: { type: 'datetime' },
        userId: { type: 'integer' },
        categoryId: { type: 'integer' }
      }
    }
  }

  $formatJson (json) {
    json = super.$formatJson(json)
    json.urls = json.urls.map(u => u.url)
    return json
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'users.id',
          to: 'articles.userId'
        }
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoriesModel,
        join: {
          from: 'categories.id',
          to: 'articles.categoryId'
        }
      },
      urls: {
        relation: Model.HasManyRelation,
        modelClass: MediasModel,
        join: {
          from: 'articles.id',
          to: 'medias.articleId'
        }
      }
    }
  }

  // Methods
  static async create (payload) {
    return ArticlesModel.query().insert(payload)
  }

  static async getById (id) {
    return ArticlesModel.query()
      .findById(id)
      .withGraphFetched('user')
      .withGraphFetched('category')
      .withGraphFetched('urls')
  }

  static async getAll () {
    return ArticlesModel.query()
      .withGraphFetched('user')
      .withGraphFetched('category')
      .withGraphFetched('urls')
  }
}

module.exports = ArticlesModel
