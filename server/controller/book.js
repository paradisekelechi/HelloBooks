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
        .then(book => res.status(200).send({
          success: true,
          message: 'Books obtained successfully',
          book
        }))
        .catch(error => res.status(400).send(error));
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
        .then(book => res.status(200).send({
          success: true,
          message: 'Books obtained successfully',
          book
        }))
        .catch(error => res.status(400).send(error));
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
        .then(book => res.status(200).send({
          success: true,
          message: 'Books obtained successfully',
          book
        }))
        .catch(error => res.status(400).send(error));
    }
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

  getSingleBook(req, res) {
    const {
      id
    } = req.query;
    if (!id) {
      res.status(400).send({
        success: false,
        message: 'Book Id is required'
      });
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
        res.status(200).send({
          success: true,
          message: 'Book obtained successfully',
          book
        });
      })
      .catch(() => res.status(400).send({
        message: 'Error getting book'
      }));
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
    if (!name) {
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
    if (!author) {
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
    if (!quantity) {
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
    if (!categoryId) {
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
      category_id: categoryId,
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
      res.status(200).send({
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
          id: Number(bookId)
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
