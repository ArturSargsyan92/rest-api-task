module.exports = {
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || '*'
  },
  PSQL: {
    URL: process.env.PSQL_URL || 'postgresql://localhost/testdb?user=artur&password=password123'
  },
  UPLOAD_PREFIX: process.env.UPLOAD_PREFIX,
  UPLOAD_FOLDER: process.env.UPLOAD_FOLDER,
  IMAGES_FOLDER: process.env.IMAGES_FOLDER,
  OAUTH2_ACCESS_TOKEN_LIFETIME: Number(process.env.OAUTH2_ACCESS_TOKEN_LIFETIME) || 60 * 60 * 4, // 4 hours
  PORT: process.env.PORT || 3040,
  SWAGGER: {
    HOST: process.env.SWAGGER_HOST || 'http://localhost:3040',
    OAUTH2_HOST: process.env.SWAGGER_OAUTH2_HOST || 'http://localhost:3040'
  }
}
