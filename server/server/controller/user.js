const User = require('../models').User;

module.exports = {
  signup(req, res) {
    let username = req.body.username;
    let email  = req.body.email;
    let password = req.body.password;
    return User
      .create({
        username: username,
        email: email,
        password: password,
        usertype: 'USER'
      })
      .then(user => res.status(201).send({
          username: username,
          usertype: 'USER',
          email: email
      }))
      .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    return User
    .findOne({
        where: {
            username: username,
            password: password
        }
    })
    .then(user => res.status(201).send({
        email: user.email,
        usertype: user.usertype,
        accounttype: user.accounttype
    }))
      .catch(error => res.status(400).send(error));
  },

};