module.exports = {
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || '*'
  },
  PSQL: {
    URL: process.env.PSQL_URL || 'postgresql://localhost/testdb?user=artur&password=password123'
  },
  OAUTH2_ACCESS_TOKEN_LIFETIME: Number(process.env.OAUTH2_ACCESS_TOKEN_LIFETIME) || 60 * 60 * 4, // 4 hours
  PORT: process.env.PORT || 3040
}
