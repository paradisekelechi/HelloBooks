/**
 *  @fileOverview Controller file for book category processes
 *
 *  @author Paradise Kelechi
 *
 * @requires ../models
 * @requires ../../tools/ResponseHandler
 */

import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  BookCategory
} = models;

export default {
  /**
   * Get all book categories in the application
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  getCategories(req, res) {
    return BookCategory
      .findAndCountAll()
      .then((bookcategory) => {
        ResponseHandler(
          req, res, 200, true, 'Book category successfully gotten',
          bookcategory, 'bookcategory'
        );
      })
      .catch((error) => {
        ResponseHandler(
          req, res, 400, false, 'Book category not successfully gotten',
          error, 'error'
        );
      });
  },

  /**
   * Add book category
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  addCategory(req, res) {
    const {
      body: {
        name,
        description,
        abbreviation
      }
    } = req;
    if (!name) {
      ResponseHandler(
        req, res, 400, false, 'Oops! Name cannot be empty',
        null, 'null'
      );
      return;
    }

    if (!description) {
      ResponseHandler(
        req, res, 400, false, 'Oops! Description cannot be empty',
        null, 'null'
      );
      return;
    }

    if (!abbreviation) {
      ResponseHandler(
        req, res, 400, false, 'Oops! Abbreviation cannot be empty',
        null, 'null'
      );
      return;
    }

    return BookCategory
      .create({
        name,
        abbreviation,
        description,
        deleted: false,
      })
      .then((category) => {
        ResponseHandler(
          req, res, 200, true, 'Book category added',
          category, 'category'
        );
      }).catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.name) {
            ResponseHandler(
              req, res, 401, false, 'Category name already exists',
              null, null
            );
          }

          if (error.fields.abbreviation) {
            ResponseHandler(
              req, res, 401, false, 'Category abbreviation already exists',
              null, null
            );
          }
        } else {
          ResponseHandler(req, res, 503, false, 'Service unavailable', error, 'error');
        }
      });
  },
};
