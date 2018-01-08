/**
 *  @fileOverview Controller file for user management processes
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:bcrypt
 * @requires ../models
 * @requires ../../tools/ResponseHandler
 */

import bcrypt from 'bcrypt';
import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  User
} = models;
const salt = bcrypt.genSaltSync(10);

export default {
  /**
   * Get all users
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
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
          ResponseHandler(
            req, res, 200, true, 'Users list successfully gotten',
            users, 'users'
          );
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
          ResponseHandler(
            req, res, 200, true, 'Users list successfully gotten',
            users, 'users'
          );
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
          ResponseHandler(
            req, res, 200, true, 'Users list successfully gotten',
            users, 'users'
          );
        });
    }
    return User
      .findAndCountAll({
        where: {
          deleted: false,
        }
      })
      .then((users) => {
        ResponseHandler(
          req, res, 200, true, 'Users list successfully gotten',
          users, 'users'
        );
      });
  },

  /**
   * Edit a User
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
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

    if (!userId) {
      ResponseHandler(
        req, res, 400, false, 'User Id is required',
        null, null
      );
      return;
    }

    if (!userTypeId && !accountTypeId && !imageUrl && !password) {
      ResponseHandler(
        req, res, 400, false, 'No data to edit',
        null, null
      );
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
        ResponseHandler(
          req, res, 200, true, 'User successfully updated',
          imageUrl, 'image'
        );
      });
  },

  /**
   * Edit  a user's password
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  editPassword(req, res) {
    const {
      body: {
        password,
        newPassword,
        confirmPassword
      }
    } = req;
    const {
      params: {
        userId
      }
    } = req;

    if (userId == null) {
      ResponseHandler(req, res, 400, false, 'User Id is required', null, null);
      return;
    }

    if (!password) {
      ResponseHandler(req, res, 400, false, 'Password is required', null, null);
      return;
    }

    if (!newPassword) {
      ResponseHandler(req, res, 400, false, 'New Password is required', null, null);
      return;
    }

    if (!confirmPassword) {
      ResponseHandler(req, res, 400, false, 'Confirm Password is required', null, null);
      return;
    }

    if (newPassword !== confirmPassword) {
      ResponseHandler(req, res, 400, false, 'New Password does not match', null, null);
      return;
    }

    return User
      .findOne({
        where: {
          id: userId
        },
      })
      .then((userDetails) => {
        const oldPassword = userDetails.password;
        bcrypt.compare(password, oldPassword, (err, success) => {
          if (!success) {
            ResponseHandler(req, res, 400, false, 'Password is incorrect', null, null);
          } else {
            bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
              User
                .update({
                  password: hashedPassword
                }, {
                  where: {
                    id: userId
                  }
                })
                .then(() => {
                  ResponseHandler(req, res, 200, true, 'Password change successful', null, null);
                });
            });
          }
        });
      });
  },

  /**
   * Delete a User from the application
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  deleteUser(req, res) {
    const {
      params: {
        userId
      }
    } = req;
    if (!userId) {
      ResponseHandler(req, res, 400, false, 'User Id is required', null, null);
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
        ResponseHandler(req, res, 200, true, 'User successfully deleted', null, null);
      });
  },
};
