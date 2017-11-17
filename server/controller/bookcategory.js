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
        name
      }
    } = req;
    const {
      body: {
        description
      }
    } = req;
    const {
      body: {
        abbreviation
      }
    } = req;
    return BookCategory
      .create({
        name,
        abbreviation,
        description,
        deleted: false,
      })
      .then(() => {
        res.status(200).send({
          message: 'Book category added',
          success: true
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
