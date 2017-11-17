import validator from 'validator';

import models from '../models';

const {
  Book
} = models;

export default {
  /**
   * view all books in the library
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} get books object
   */
  getBooks(req, res) {
    return Book
      .findAndCountAll({
        where: {
          deleted: false,
        }
      }, {
        include: [{
          model: models.BookCategory,
        }],
      })
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(() => res.status(400).send({
        message: 'Error getting books'
      }));
  },

  /**
   * View all books in the library by category
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Create book response object
   */
  getBookByCategory(req, res) {
    const {
      params: {
        categoryId
      }
    } = req;

    if (categoryId == null) {
      res.status(200).send({
        success: false,
        message: 'Book category Id is required'
      });
      return;
    }
    return Book
      .findAll({
        where: {
          category_id: categoryId,
          deleted: false
        }
      }, {
        include: [{
          model: models.BookCategory,
        }],
      })
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Get all finished books
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Finished books response object
   */
  getFinishedBooks(req, res) {
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
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Get available books
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Available books object
   */
  getAvailableBooks(req, res) {
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
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Get deleted books
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Deleted books object
   */
  getDeletedBooks(req, res) {
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
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Get books by borrow status
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Book Object
   */
  getBooksByBorrowStatus(req, res) {
    const borrowStatus = req.query.borrowed;
    return Book
      .findAll({
        where: {
          deleted: false,
          borrowed: borrowStatus
        }
      }, {
        include: [{
          model: models.BookCategory,
        }],
      })
      .then(book => res.status(200).send({
        success: true,
        message: 'Books obtained successfully',
        book
      }))
      .catch(error => res.status(400).send(error));
  },

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
     * checks if the name is undefined or null and insists on it
     */
    if (validator.isEmpty(`${name}`) || name == null) {
      res.status(400).send({
        success: false,
        message: 'Book name is required'
      });
      return;
    }
    name = validator.trim(`${name}`);


    /**
     * checks if the author is undefined or null and insists on it
     */
    if (validator.isEmpty(`${author}`) || author == null) {
      res.status(400).send({
        success: false,
        message: 'Book author is required'
      });
      return;
    }
    author = validator.trim(`${author}`);


    /**
     * checks if the quantity is empty or null and insists on it
     */
    if (validator.isEmpty(`${quantity}`) || quantity == null) {
      res.status(400).send({
        success: false,
        message: 'Quantity is required'
      });
      return;
    }
    quantity = parseInt(quantity, 10);


    /**
     * checks if the categoryId is empty or null and insists on it
     */
    if (validator.isEmpty(`${categoryId}`) || categoryId == null) {
      res.status(400).send({
        success: false,
        message: 'Category is required'
      });
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
        res.status(200).send({
          success: true,
          message: 'Book successfully added',
          book
        });
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Oops! Book not successfully added'
      }));
  },

  /**
   * Edit Book
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Book object
   */
  editBook(req, res) {
    const {
      description,
      quantity,
      categoryId,
      bookUrl
    } = req.body;
    const {
      bookId
    } = req.params;

    if (bookId == null || bookId === 0 || bookId === undefined) {
      res.status(400).send({
        success: false,
        message: 'Oops!! BookId is required'
      });
      return;
    }

    if (description == null && quantity == null && categoryId == null && bookUrl == null) {
      res.status(400).send({
        success: false,
        message: 'No data to edit'
      });
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
          id: bookId
        }
      })
      .then(() => {
        res.status(200).send({
          message: 'Book edited successfully',
          success: true
        });
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Oops! Book not edited successfully'
      }));
  },

};
