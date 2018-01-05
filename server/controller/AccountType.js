import models from '../models';

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
        res.status(200).send({
          success: true,
          message: 'Account types gotten',
          accounttype
        });
      })
      .catch((error) => {
        res.status(400).send(error);
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
      res.status(400).send({
        success: false,
        message: 'Oops! Name cannot be empty'
      });
      return;
    }

    if (!description) {
      res.status(400).send({
        success: false,
        message: 'Oops! Description cannot be empty'
      });
      return;
    }

    if (!level) {
      res.status(400).send({
        success: false,
        message: 'Oops! Level cannot be empty'
      });
      return;
    }
    if (Number.isNaN(Number(level))) {
      res.status(400).send({
        success: false,
        message: 'Level should be a valid number'
      });
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
        res.status(200).send({
          message: 'Accounttype added successfully',
          success: true,
          accounttype
        });
      })
      .catch(error => res.status(400).send({
        success: false,
        message: 'Account Type not  added',
        error
      }));
  },
};
