/**
 *  @fileOverview Controller file for user type processes
 *
 *  @author Paradise Kelechi
 *
 * @requires ../models
 * @requires ../../tools/ResponseHandler
 */

import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  UserType
} = models;

export default {
  /**
   * Get all the usertypes
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  getUserTypes(req, res) {
    return UserType
      .findAndCountAll({
        where: {
          deleted: false
        }
      })
      .then((usertype) => {
        ResponseHandler(req, res, 200, true, 'Usertypes gotten successfully', usertype, 'usertype');
      });
  },

  /**
   * Add a new usertype
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  addUserType(req, res) {
    const {
      body: {
        description,
        level,
        name
      }
    } = req;

    if (!name) {
      ResponseHandler(req, res, 400, false, 'Oops! Name cannot be empty', null, null);
      return;
    }

    if (!description) {
      ResponseHandler(req, res, 400, false, 'Oops! Description cannot be empty', null, null);
      return;
    }

    if (!level) {
      ResponseHandler(req, res, 400, false, 'Oops! Level cannot be empty', null, null);
      return;
    }

    if (Number.isNaN(Number(level))) {
      ResponseHandler(req, res, 400, false, 'Level should be a valid number', null, null);
      return;
    }

    return UserType
      .create({
        name,
        level,
        description,
        deleted: false,
      })
      .then((usertype) => {
        ResponseHandler(req, res, 200, true, 'Usertype added successfully', usertype, 'usertype');
      });
  },
};
