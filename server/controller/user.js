// Import User  model
import dotenv from 'dotenv';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../models';

//  import  User from '../models';
const { User } = models;

const config = dotenv.config();
const empty = '';

//  Secret for authentication -- to be added to the environment as a variable
const secret = config.parsed.SECRET;
const salt = bcrypt.genSaltSync(10);

export default {
  signup(req, res) {
    let { body: { username, email, password } } = req;

    if (validator.isEmpty(`username  ${empty}`) || username == null) {
      res.status(401).send({
        success: false,
        message: 'Username is required'
      });
      return;
    }
    username = validator.trim(`${username}`);

    if (validator.isEmpty(`${email}`) || email == null) {
      res.status(401).send({
        success: false,
        message: 'Email is required'
      });
      return;
    }
    email = validator.trim(`${email}`);

    if (validator.isEmpty(`${password}`) || password == null) {
      res.status(401).send({
        success: false,
        message: 'Password is required'
      });
      return;
    }
    password = validator.trim(`${password}`);


    if (!validator.isEmail(`${email}`)) {
      res.status(401).send({
        success: false,
        message: 'Enter a valid email address'
      });
      return;
    }


    bcrypt.hash(password, salt, (err, hashedPassword) => User
      .create({
        username,
        email,
        password: hashedPassword,
        active: true,
        deleted: false,
        use_count: 0,
        user_type_id: 1,
        account_type_id: 1
      })
      .then((user) => {
        // token generated
        const token = jwt.sign({
          email: user.dataValues.email,
          username: user.dataValues.username,
          usertype: user.dataValues.user_type_id,
          account_type: user.dataValues.account_type_id
        }, secret, { expiresIn: 24 * 60 * 60 * 40 });
        if (user) {
          res.status(200).send({
            message: 'User Account Creation Successful',
            token,
            success: true,
            email: user.dataValues.email,
            username: user.dataValues.username,
            usertype: user.dataValues.user_type_id,
            account_type: user.dataValues.account_type_id
          });
        } else {
          res.status(401).send({
            message: 'User account not created',
            token,
            success: true
          });
        }
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.username) {
            res.status(401).send({
              success: false,
              message: 'Username already exists'
            });
          }

          if (error.fields.email) {
            res.status(401).send({
              success: false,
              message: 'Email already exists'
            });
          }
        } else {
          res.status(503).send({
            success: false,
            message: 'Service unavailable'
          });
        }
      }));
  },

  signin(req, res) {
    const { body: { username, password } } = req;

    if (validator.isEmpty(`${username}`) || username == null) {
      res.status(401).send({
        success: false,
        message: 'Username is required'
      });
      return;
    }

    if (validator.isEmpty(`${password}`) || password == null) {
      res.status(401).send({
        success: false,
        message: 'Password is required'
      });
      return;
    }

    return User
      .findOne({
        where: {
          username,
        },
        include: [{ model: models.UserType }, { model: models.AccountType }]
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, success) => {
            if (success) {
              // token generated
              const token = jwt.sign({
                email: user.email,
                username: user.username,
                usertype: user.user_type_id,
                accounttype: user.account_type_id
              }, secret, { expiresIn: 24 * 3600 * 3600 * 40 });

              // token and user details sent to the user
              res.status(200).send({
                success: true,
                message: 'User successfully signed in ',
                token,
                usertype: user.user_type_id,
                username: user.username,
                email: user.email,
                accounttype: user.account_type_id
              });
            } else {
              res.status(401).send({
                message: 'Oops! Password is incorrect',
                success: false
              });
            }
          });
        } else {
          res.status(401).send({
            message: 'Oops! Username does not exist',
            success: false
          });
        }
      })
      .catch(() => res.status(401).send({
        message: 'Oops! User does not exist',
        success: false
      }));
  },

  getUsers(req, res) {
    return User
      .findAndCountAll({
        where: {
          deleted: false,
        }
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users list successfully gotten ',
          users
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  getAdminUsers(req, res) {
    return User
      .findAndCountAll({
        where: {
          deleted: false,
          user_type_id: 2
        }
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users list successfully gotten ',
          users
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  getClientUsers(req, res) {
    return User
      .findAndCountAll({
        where: {
          deleted: false,
          user_type_id: 1
        }
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users list successfully gotten ',
          users
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  getDeletedUsers(req, res) {
    return User
      .findAndCountAll({
        where: {
          deleted: true,
        }
      })
      .then((users) => {
        res.status(200).send({
          success: true,
          message: 'Users list successfully gotten ',
          users
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  getUsersByUserType(req, res) {
    const { params: { userTypeId } } = req;

    if (userTypeId == null) {
      res.status(400).send({
        success: false,
        message: 'Usertypeid is required'
      });
      return;
    }

    return User
      .findAll({
        where: {
          deleted: false,
          user_type_id: userTypeId
        }
      })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  getUsersByAccountType(req, res) {
    const { params: { accountTypeId } } = req;

    if (accountTypeId == null) {
      res.status(400).send({
        success: false,
        message: 'Accounttypeid is required'
      });
    }

    return User
      .findAll({
        where: {
          deleted: false,
          account_type_id: accountTypeId
        }
      })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Users list not obtained'
        });
      });
  },

  editUser(req, res) {
    const {
      body: {
        userTypeId, accountTypeId, imageUrl, password
      }
    } = req;
    const { params: { userId } } = req;

    if (userId == null) {
      res.status(400).send({
        success: false,
        message: 'User Id is required'
      });
      return;
    }

    if(userTypeId == null && accountTypeId == null && imageUrl == null && password == null){
      res.status(400).send({
        success: false,
        message: 'No data to edit'
      });
      return;
    }

    return User
      .update({
        user_type_id: userTypeId,
        account_type_id: accountTypeId,
        image: imageUrl
      }, {
        where: {
          id: userId
        }
      })
      .then(() => {
        res.status(200).send({
          success: true,
          message: 'User successfully updated'
        });
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'User not successfully updated'
        });
      });
  },

  deleteUser(req, res) {
    const { params: { userId } } = req;
    if (userId == null) {
      res.status(400).send({
        success: false,
        message: 'User Id is required'
      });
      return;
    }

    return User
      .update({
        deleted: true,
      }, {
        where: {
          id: userId
        }
      })
      .then(() => {
        res.status(200).send({
          success: true,
          message: 'User successfully deleted'
        });
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'User not successfully deleted'
        });
      });
  },
};
