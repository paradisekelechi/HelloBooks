export default {

  production: {
    username: process.env.DB_USERNAME || 'andela',
    password: process.env.DB_PASSWORD || 'andela',
    database: process.env.DB_NAME || 'hellobooks-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  development: {
    username: process.env.DB_USERNAME || 'andela',
    password: process.env.DB_PASSWORD || 'andela',
    database: process.env.DB_NAME || 'hellobooks',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'postgres://pcyausvn:Y7vc35xlYsNal2T2v1H2WspFoq8NZkUY@pellefant.db.elephantsql.com:5432/pcyausvn',
    dialect: 'postgres'
  },
};
