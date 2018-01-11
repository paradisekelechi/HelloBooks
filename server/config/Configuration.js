export default {
  development: {
    use_env_variable: 'postgres://vrjfhcrl:Bnh3v4OMvhNcDnLqyR09Z2Z0WkKc3Qw1@stampy.db.elephantsql.com:5432/vrjfhcrl',
    dialect: 'postgres'
  },
  developmentBackup: {
    username: 'andela',
    password: 'andela',
    database: 'hellobooks',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  testBackup: {
    username: 'andela',
    password: 'andela',
    database: 'hellobooks-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'postgres://vrjfhcrl:Bnh3v4OMvhNcDnLqyR09Z2Z0WkKc3Qw1@stampy.db.elephantsql.com:5432/vrjfhcrl',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'postgres://pcyausvn:Y7vc35xlYsNal2T2v1H2WspFoq8NZkUY@pellefant.db.elephantsql.com:5432/pcyausvn',
    dialect: 'postgres'
  },
  e2e: {
    use_env_variable: 'postgres://pcyausvn:Y7vc35xlYsNal2T2v1H2WspFoq8NZkUY@pellefant.db.elephantsql.com:5432/pcyausvn',
    dialect: 'postgres'
  },
};
