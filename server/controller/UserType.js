import models from '../models';

const {
  UserType
} = models;

/**
 * Export usertype controller methods
 */
export default {

  /**
   * Get all the usertypes
   * @returns {Object} description
   * @param {Object} req
   * @param {Object} res
   */
  getUserTypes(req, res) {
    return UserType
      .findAll({
        where: {
          deleted: false
        }
      })
      .then((usertype) => {
        res.status(200).send({
          success: true,
          message: 'Usertypes gotten successfully',
          usertype
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  /**
   * Add a new usertype
   * @returns {Object} description
   * @param {Object} req
   * @param {Object} res
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
        message: 'Level should be a valid number',
        resultType: typeof (level)
      });
      return;
    }

    return UserType
      .create({
        name,
        level,
        description,
        deleted: false,
      })
      .then(() => {
        res.send({
          message: 'Usertype added successfully',
          success: true
        });
      })
      .catch(error => res.status(400).send(error));
  },
};
