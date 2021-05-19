const yaml = require('yamljs')

const { SWAGGER } = require('./variables.config')

const swaggerDocument = yaml.load('./api/swagger/swagger.yaml')

class SwaggerConfig {
  /**
   * @return {*}
   * @description Get swagger document.
   */
  static getSwaggerDocument () {
    swaggerDocument.host = SWAGGER.HOST.replace('http://', '').replace('https://', '')
    swaggerDocument['securityDefinitions']['oAuth2Security'].tokenUrl = `${SWAGGER.OAUTH2_HOST}/api/v1/oauth2/token`

    return swaggerDocument
  }
}

module.exports = SwaggerConfig
