const config = {
  workerConcurrency: process.env.WORKER_CONCURRENCY || 1,
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || "development",
  logglyToken: process.env.LOGGLY_TOKEN || false,
  logglySubdomain: process.env.LOGGLY_SUBDOMAIN || false,
  logglyTag: process.env.LOGGLY_TAG || false,
  mongoURL: process.env.MONGOLAB_URL || "mongodb://127.0.0.1/sample",
  logMongoURL: process.env.LOG_MONGOLAB_URL || "mongodb://127.0.0.1/sampleLogs",
  SQLUsername: process.env.SQL_USERNAME || "root",
  SQLPassword: process.env.SQL_PASSWORD || "mysql",
  SQLDatabase: process.env.SQL_DATABASE || "sample",
  SQLHost: process.env.SQL_HOST || "127.0.0.1",
  SQLPort: process.env.SQL_PORT || 3306,
  SQLDriver: process.env.SQL_DRIVER || "mysql", //'mysql'|'sqlite'|'postgres'|'mssql'
  SQLTimezone: process.env.SQL_TIMEZONE || "+01:00",
  noFrontendCaching: process.env.NO_CACHE || "yes",
  frontendCacheExpiry: process.env.FRONTEND_CACHE_EXPIRY || "90",
  backendCacheExpiry: process.env.BACKEND_CACHE_EXPIRY || "90",

  rateLimit: process.env.RATE_LIMIT || 100,
  //limit in minutes
  rateLimitExpiry: process.env.RATE_LIMIT_EXPIRY || 15,
  redisURL: process.env.REDIS_URL || "redis://127.0.0.1:6379/1",
};

export default config;
