import validator from 'validator';

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
      .findAll({
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
      }
    } = req;
    const {
      body: {
        description
      }
    } = req;
    const {
      body: {
        level
      }
    } = req;

    if (validator.isEmpty(`${name}`) || name === '' || name == null) {
      res.status(400).send({
        success: false,
        message: 'Oops! Name cannot be empty'
      });
      return;
    }

    if (validator.isEmpty(`${description}`) || description === '' || description == null) {
      res.status(400).send({
        success: false,
        message: 'Oops! Description cannot be empty'
      });
      return;
    }

    if (validator.isEmpty(`${level}`) || level === '' || level == null) {
      res.status(400).send({
        success: false,
        message: 'Oops! Level cannot be empty'
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
      .then(() => {
        res.status(200).send({
          message: 'Accounttype added successfully',
          success: true
        });
      })
      .catch(error => res.status(400).send(error));
  },
};
