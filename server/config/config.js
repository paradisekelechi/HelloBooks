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
    username: 'andela',
    password: 'andela',
    database: 'hellobooks-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};
