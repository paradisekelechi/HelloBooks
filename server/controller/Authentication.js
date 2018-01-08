/**
 *  @fileOverview Controller file for authentication
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:validator
 * @requires NPM:jsonwebtoken
 * @requires NPM:bcrypt
 * @requires ../models
 * @requires ../../tools/ResponseHandler
 */

import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  User
} = models;

/**
 * Secret for authentication
 */
const secret = process.env.SECRET;
const salt = bcrypt.genSaltSync(10);

export default {
  /**
   * Sign up user
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  signup(req, res) {
    let {
      body: {
        username,
        email,
        password
      }
    } = req;

    if (!username) {
      ResponseHandler(req, res, 401, false, 'Username is required', null, null);
      return;
    }
    username = validator.trim(`${username}`);

    if (!email) {
      ResponseHandler(req, res, 401, false, 'Email is required', null, null);
      return;
    }
    email = validator.trim(`${email}`);

    if (!password) {
      ResponseHandler(req, res, 401, false, 'Password is required', null, null);
      return;
    }
    password = validator.trim(`${password}`);

    if (!validator.isEmail(`${email}`)) {
      ResponseHandler(req, res, 401, false, 'Enter a valid email address', null, null);
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
          image: user.dataValues.image,
          useCount: user.dataValues.use_count
        }, secret, {
          expiresIn: 24 * 60 * 60 * 40
        });
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
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.username) {
            ResponseHandler(req, res, 401, false, 'Username already exists', null, null);
          }

          if (error.fields.email) {
            ResponseHandler(req, res, 401, false, 'Email already exists', null, null);
          }
        } else {
          ResponseHandler(req, res, 503, false, 'Service unavailable', error, 'error');
        }
      }));
  },

  /**
   * Sign in user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {void}
   */
  signin(req, res) {
    const {
      body: {
        username,
        password
      }
    } = req;

    if (!username) {
      ResponseHandler(req, res, 401, false, 'Username is required', null, null);
      return;
    }

    if (!password) {
      ResponseHandler(req, res, 401, false, 'Password is required', null, null);
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
                image: user.image,
                useCount: user.use_count
              }, secret, {
                expiresIn: 24 * 3600 * 3600 * 10
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
              ResponseHandler(req, res, 401, false, 'Oops! Password is incorrect', null, null);
            }
          });
        } else {
          ResponseHandler(req, res, 401, false, 'Oops! Username does not exist', null, null);
        }
      });
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   */
  googleSignin(req, res) {
    let {
      body: {
        username,
        email,
        password
      }
    } = req;

    if (!username) {
      ResponseHandler(req, res, 401, false, 'Username is required', null, null);
      return;
    }
    username = validator.trim(`${username}`);

    if (!email) {
      ResponseHandler(req, res, 401, false, 'Email is required', null, null);
      return;
    }
    email = validator.trim(`${email}`);

    if (!password) {
      ResponseHandler(req, res, 401, false, 'Password is required', null, null);
      return;
    }
    password = validator.trim(`${password}`);


    if (!validator.isEmail(`${email}`)) {
      ResponseHandler(req, res, 401, false, 'Enter a valid email address', null, null);
      return;
    }

    return User
      .findOne({
        where: {
          email
        }
      })
      .then((response) => {
        if (!response) {
          User
            .findOne({
              where: {
                username
              }
            })
            .then((usernameResponse) => {
              if (!usernameResponse) {
                User
                  .create({
                    username,
                    email,
                    password,
                    active: true,
                    deleted: false,
                    use_count: 0,
                    user_type_id: 1,
                    account_type_id: 1
                  })
                  .then((userDetails) => {
                    const token = jwt.sign({
                      userid: userDetails.dataValues.id,
                      email: userDetails.dataValues.email,
                      username: userDetails.dataValues.username,
                      usertype: userDetails.dataValues.user_type_id,
                      account_type: userDetails.dataValues.account_type_id,
                      image: userDetails.dataValues.image,
                      useCount: userDetails.dataValues.use_count
                    }, secret, {
                      expiresIn: 24 * 60 * 60 * 40
                    });
                    res.status(200).send({
                      message: 'User authenticated successfully',
                      token,
                      success: true,
                      email: userDetails.dataValues.email,
                      userid: userDetails.dataValues.id,
                      username: userDetails.dataValues.username,
                      usertype: userDetails.dataValues.user_type_id,
                      account_type: userDetails.dataValues.account_type_id
                    });
                  });
              } else {
                ResponseHandler(
                  req, res, 400, false, 'User  username already exists',
                  null, null
                );
              }
            });
        } else {
          const token = jwt.sign({
            userid: response.dataValues.id,
            email: response.dataValues.email,
            username: response.dataValues.username,
            usertype: response.dataValues.user_type_id,
            account_type: response.dataValues.account_type_id,
            image: response.dataValues.image,
            useCount: response.dataValues.use_count
          }, secret, {
            expiresIn: 24 * 60 * 60 * 40
          });
          res.status(200).send({
            message: 'User authenticated successfully',
            token,
            success: true,
            email: response.dataValues.email,
            userid: response.dataValues.id,
            username: response.dataValues.username,
            usertype: response.dataValues.user_type_id,
            account_type: response.dataValues.account_type_id
          });
        }
      });
  },
};
