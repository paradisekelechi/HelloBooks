export default {
  development: {
    username: 'andela',
    password: 'andela',
    database: 'hellobooks',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'postgres://kcnqwqfd:Mc8twJz_ImB06mBjSl-4E3Vvn296rEjU@pellefant.db.elephantsql.com:5432/kcnqwqfd',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'postgres://vrjfhcrl:Bnh3v4OMvhNcDnLqyR09Z2Z0WkKc3Qw1@stampy.db.elephantsql.com:5432/vrjfhcrl',
    dialect: 'postgres'
  }
};
