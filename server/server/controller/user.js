//Import User model
const User = require('../models').User;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const dotenv = require('dotenv');

module.exports = {
  signup(req, res) {
    let username = req.body.username;
    let email  = req.body.email;
    let password = req.body.password;
    let hashedPassword = bcrypt.hashSync(password, salt);
    //console.log(dotenv.load());
    
    return User
      .create({
        username: username,
        email: email,
        password: hashedPassword,
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