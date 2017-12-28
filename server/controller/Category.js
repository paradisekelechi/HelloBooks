import models from '../models';

const {
  BookCategory
} = models;

export default {
  /**
   * view all books in the library
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} categories object
   */
  getCategories(req, res) {
    return BookCategory
      .findAll()
      .then((bookcategory) => {
        res.status(200).send({
          success: true,
          message: 'Book category successfully gotten',
          bookcategory
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: 'Book category not successfully gotten',
          error
        });
      });
  },

  /**
   * Add category
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response object
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

    if (!abbreviation) {
      res.status(400).send({
        success: false,
        message: 'Oops! Abbreviation cannot be empty'
      });
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
        res.status(200).send({
          message: 'Book category added',
          success: true,
          category
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: 'Book cactegory not added',
          success: false,
          error
        });
      });
  },
};
