import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  AccountType
} = models;

export default {

  /**
   * Get all the account types
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} description
   */
  getAccountTypes(req, res) {
    return AccountType
      .findAndCountAll({
        where: {
          deleted: false
        }
      })
      .then((accounttype) => {
        ResponseHandler(req, res, 200, true, 'Account types gotten', accounttype, 'accounttype');
      })
      .catch((error) => {
        ResponseHandler(req, res, 400, true, 'Account types not gotten', error, 'error');
      });
  },

  /**
   * Add a new Account type
   * @returns {Object} description
   * @param {Request} req
   * @param {Response} res
   */
  addAccountType(req, res) {
    const {
      body: {
        name,
        description,
        level
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

    return AccountType
      .create({
        name,
        level,
        description,
        deleted: false,
      })
      .then((accounttype) => {
        ResponseHandler(
          req, res, 200, true, 'Accounttype added successfully',
          accounttype, 'accounttype'
        );
      })
      .catch((error) => {
        ResponseHandler(req, res, 400, false, 'Account Type not  added', error, 'error');
      });
  },
};
