import dotenv from 'dotenv';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../models';

const {
  User
} = models;

const config = dotenv.config();
const empty = '';

/**
 * Secret for authentication -- to be added to the environment as a variable
 */
const secret = config.parsed.SECRET;
const salt = bcrypt.genSaltSync(10);

export default {
  /**
   * Sign up user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  signup(req, res) {
    let {
      body: {
        username,
        email,
        password
      }
    } = req;

    if (validator.isEmpty(`${username}${empty}`) || username == null) {
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
          userid: user.dataValues.id,
          email: user.dataValues.email,
          username: user.dataValues.username,
          usertype: user.dataValues.user_type_id,
          account_type: user.dataValues.account_type_id,
          image: user.dataValues.image
        }, secret, {
          expiresIn: 24 * 60 * 60 * 40
        });
        if (user) {
          res.status(200).send({
            message: 'User Account Creation Successful',
            token,
            success: true,
            email: user.dataValues.email,
            userid: user.dataValues.id,
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
            message: 'Service unavailable',
            error
          });
        }
      }));
  },

  /**
   * Sign in user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  signin(req, res) {
    const {
      body: {
        username,
        password
      }
    } = req;

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
        include: [{
          model: models.UserType
        }, {
          model: models.AccountType
        }]
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, success) => {
            if (success) {
              // token generated
              const token = jwt.sign({
                userid: user.id,
                email: user.email,
                username: user.username,
                usertype: user.user_type_id,
                accounttype: user.account_type_id,
                image: user.image
              }, secret, {
                expiresIn: 24 * 3600 * 3600 * 40
              });

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

  /**
   * Get all users
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  getUsers(req, res) {
    if (req.query.client === 'true') {
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
    }
    if (req.query.admin === 'true') {
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
    }
    if (req.query.deleted === 'true') {
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
    }
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

  /**
   * Edit User
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  editUser(req, res) {
    const {
      body: {
        userTypeId,
        accountTypeId,
        imageUrl,
        password
      }
    } = req;
    const {
      params: {
        userId
      }
    } = req;

    if (userId == null) {
      res.status(400).send({
        success: false,
        message: 'User Id is required'
      });
      return;
    }

    if (userTypeId == null && accountTypeId == null && imageUrl == null && password == null) {
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
          message: 'User successfully updated',
          image: imageUrl
        });
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'User not successfully updated'
        });
      });
  },

  /**
   * DeleteUser
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response object
   */
  deleteUser(req, res) {
    const {
      params: {
        userId
      }
    } = req;
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
