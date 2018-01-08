/**
 *  @fileOverview Controller file for book processes
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:validator
 * @requires ../models
 * @requires ../../tools/ResponseHandler
 */

import validator from 'validator';

import models from '../models';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  Book
} = models;

export default {
  /**
   * View all books in the library
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {void}
   */
  getBooks(req, res) {
    if (req.query.finished === 'true') {
      return Book
        .findAndCountAll({
          where: {
            deleted: false,
            quantity: 0
          }
        }, {
          include: [{
            model: models.BookCategory,
          }],
        })
        .then((book) => {
          ResponseHandler(req, res, 200, true, 'Books obtained successfully', book, 'book');
        }).catch(error => res.status(400).send(error));
    }

    if (req.query.available === 'true') {
      return Book
        .findAndCountAll({
          where: {
            deleted: false,
            quantity: {
              $ne: 0
            }
          }
        }, {
          include: [{
            model: models.BookCategory,
          }],
        })
        .then((book) => {
          ResponseHandler(req, res, 200, true, 'Books obtained successfully', book, 'book');
        })
        .catch((error) => {
          ResponseHandler(req, res, 400, false, 'Books not obtained successfully', error, 'error');
        });
    }

    if (req.query.deleted === 'true') {
      return Book
        .findAndCountAll({
          where: {
            deleted: true
          }
        }, {
          include: [{
            model: models.BookCategory,
          }],
        })
        .then((book) => {
          ResponseHandler(req, res, 200, true, 'Books obtained successfully', book, 'book');
        })
        .catch((error) => {
          ResponseHandler(req, res, 400, true, 'Books not obtained successfully', error, 'error');
        });
    }
    return Book
      .findAndCountAll({
        include: [{
          model: models.BookCategory,
        }],
      })
      .then((book) => {
        ResponseHandler(req, res, 200, true, 'Books obtained successfully', book, 'book');
      })
      .catch(() => {
        ResponseHandler(req, res, 400, false, 'Error getting books', null, null);
      });
  },

  /**
   * Gets a single book resource from the database
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   */
  getSingleBook(req, res) {
    const {
      id
    } = req.query;
    if (!id) {
      ResponseHandler(req, res, 400, false, 'Book Id is required', null, null);
      return;
    }
    const bookId = Number(id);
    return Book
      .find({
        where: {
          deleted: false,
          id: bookId
        }
      }, {
        include: [{
          model: models.BookCategory,
        }],
      })
      .then((book) => {
        ResponseHandler(req, res, 200, true, 'Book obtained successfully', book, 'book');
      });
  },

  /**
   * Adds a new book to the database
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   */
  addBook(req, res) {
    let {
      body: {
        name,
        author,
        description,
        categoryId,
        quantity,
        image
      }
    } = req;

    /**
     * Checks if the name is undefined or null and insists on it
     */
    if (!name) {
      ResponseHandler(req, res, 400, false, 'Book name is required', null, null);
      return;
    }
    name = validator.trim(`${name}`);


    /**
     * Checks if the author is undefined or null and insists on it
     */
    if (!author) {
      ResponseHandler(req, res, 400, false, 'Book author is required', null, null);
      return;
    }
    author = validator.trim(`${author}`);


    /**
     * Checks if the quantity is empty or null and insists on it
     */
    if (!quantity) {
      ResponseHandler(req, res, 400, false, 'Quantity is required', null, null);
      return;
    }
    quantity = parseInt(quantity, 10);


    /**
     * Checks if the categoryId is empty or null and insists on it
     */
    if (!categoryId) {
      ResponseHandler(req, res, 400, false, 'Category is required', null, null);
      return;
    }
    categoryId = parseInt(categoryId, 10);


    image = validator.trim(`${image}`);
    description = validator.trim(`${description}`);

    return Book
      .create({
        name,
        description,
        author,
        quantity,
        cover: image,
        borrowed: false,
        deleted: false,
        category_id: categoryId
      })
      .then((book) => {
        ResponseHandler(req, res, 200, true, 'Book successfully added', book, 'book');
      })
      .catch(() => {
        ResponseHandler(req, res, 400, false, 'Oops! Book not successfully added', null, null);
      });
  },

  /**
   * Edit Book in the database
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {void}
   */
  editBook(req, res) {
    const {
      description,
      quantity,
      category_id: categoryId,
      bookUrl
    } = req.body;
    const {
      bookId
    } = req.params;

    if (!bookId) {
      ResponseHandler(req, res, 400, false, 'Oops!! BookId is required', null, null);
      return;
    }

    if (!description && !quantity && !categoryId && !bookUrl) {
      ResponseHandler(req, res, 400, false, 'No data to edit', null, null);
      return;
    }

    return Book
      .update({
        description,
        quantity,
        category_id: categoryId,
        cover: bookUrl
      }, {
        where: {
          id: Number(bookId)
        }
      })
      .then(() => {
        ResponseHandler(req, res, 200, true, 'Book edited successfully', null, null);
      })
      .catch(() => {
        ResponseHandler(req, res, 400, false, 'Oops! Book not edited successfully', null, null);
      });
  },

  /**
   * Deletes book from the database
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   */
  deleteBook(req, res) {
    const {
      bookId
    } = req.params;
    if (!bookId) {
      ResponseHandler(req, res, 400, false, 'Oops!! BookId is required', null, null);
      return;
    }

    return Book
      .update({
        deleted: true
      }, {
        where: {
          id: Number(bookId)
        }
      })
      .then(() => {
        ResponseHandler(req, res, 200, true, 'Book deleted successfully', null, null);
      })
      .catch(() => {
        ResponseHandler(req, res, 400, false, 'Oops! Book not deleted successfully', null, null);
      });
  },
};
