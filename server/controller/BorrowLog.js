/**
 *  @fileOverview Controller file for borrow and return book processes
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:validator
 * @requires ../models
 * @requires '../../tools/Email'
 * @requires ../../tools/ResponseHandler
 */

import validator from 'validator';
import models from '../models';
import emailController from '../../tools/Email';
import ResponseHandler from '../../tools/ResponseHandler';

const {
  notification
} = emailController;


const {
  BorrowLog
} = models;
const {
  Book
} = models;
const {
  User
} = models;

export default {
  /**
   * Borrow book from the application
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  borrowBook(req, res) {
    const today = new Date();
    const borrowDate = today;
    const userEmail = req.email;
    const timeout = 24 * 60 * 60 * 1000 * process.env.BORROW_VALIDITY_IN_DAYS;
    const returnDate = validator.isEmpty(`${req.body.return_date}`) || req.body.return_date == null ?
      new Date(today.getTime() + timeout) : new Date(req.body.return_date);
    const {
      params: {
        userId
      }
    } = req;
    const {
      body: {
        bookId
      }
    } = req;

    /**
     * Check if userid
     */
    if (!userId) {
      ResponseHandler(req, res, 400, false, 'Oops! Userid is required!', null, null);
    }

    /**
     * Check if the bookId is null and insist on it
     */
    if (!bookId) {
      ResponseHandler(req, res, 400, false, 'Oops! BookId is required!', null, null);
      return;
    }

    // Check for the availability of the book
    return Book
      .find({
        where: {
          id: bookId
        }
      })
      .then((book) => {
        if (!book) {
          ResponseHandler(req, res, 404, false, 'Book does not exist', null, null);
        } else if (book.quantity === 0) {
          ResponseHandler(req, res, 404, false, 'Book is no longer available', null, null);
        } else {
          return BorrowLog
            .findAll({
              where: {
                returned: false,
                user_id: userId,
                book_id: bookId
              },
            })
            .then((log) => {
              if (log.length > 0 && !log[0].returned) {
                ResponseHandler(
                  req, res, 400, false, 'You have already borrowed this book',
                  null, null
                );
              } else {
                /**
                 * Borrow book by user
                 */
                return BorrowLog
                  .create({
                    borrow_date: borrowDate,
                    return_date: returnDate,
                    returned: false,
                    deleted: false,
                    user_id: userId,
                    book_id: bookId,
                  })
                  .then((borrowDetails) => {
                    /**
                     * Update book quantity
                     */
                    Book
                      .update({
                        quantity: models.sequelize.literal('quantity - 1')
                      }, {
                        where: {
                          id: bookId
                        }
                      })
                      .then(() => {
                        ResponseHandler(
                          req, res, 200, true, 'Book borrowed successfully',
                          borrowDetails, 'borrowDetails'
                        );
                        notification('Book borrowed successfully', userEmail, 'Hello Books');
                      });
                  });
              }
            });
        }
      });
  },


  /**
   * Returns a borrowed book to the application
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  returnBook(req, res) {
    const today = new Date();
    const returnDate = today;
    const {
      params: {
        userId
      },
      body: {
        bookId
      },
      email: userEmail
    } = req;

    if (!userId) {
      ResponseHandler(req, res, 400, false, 'Userid is required!', null, null);
      return;
    }

    if (!bookId) {
      ResponseHandler(req, res, 400, false, 'BookId is required!', null, null);
      return;
    }

    return Book
      .find({
        where: {
          id: bookId
        }
      })
      .then((book) => {
        if (!book) {
          ResponseHandler(req, res, 404, false, 'Book does not exist', null, null);
        } else {
          return BorrowLog
            .findAll({
              where: {
                user_id: userId,
                book_id: bookId
              },
              order: [
                ['borrow_date', 'DESC'],
              ]
            })
            .then((borrowLogs) => {
              const lastTransaction = borrowLogs[0];
              if (lastTransaction.returned) {
                ResponseHandler(
                  req, res, 400, false,
                  'Oops! You have already returned this book!', null, null
                );
              } else {
                /**
                 * Return Borrowed book
                 */
                return BorrowLog
                  .update({
                    return_date: returnDate,
                    returned: true,
                    deleted: false
                  }, {
                    where: {
                      user_id: userId,
                      book_id: bookId,
                      returned: false
                    }
                  })
                  .then((returnLog) => {
                    /**
                     * Update book quantity accordingly
                     */
                    Book
                      .update({
                        quantity: models.sequelize.literal('quantity + 1')
                      }, {
                        where: {
                          id: bookId
                        }
                      })
                      .then((bookUpdate) => {
                        /**
                         * Update user use count for user account type profiling
                         */
                        User
                          .update({
                            use_count: models.sequelize.literal('use_count + 1')
                          }, {
                            where: {
                              id: userId
                            }
                          })
                          .then((userUpdate) => {
                            res.status(200).send({
                              success: true,
                              message: 'Book returned successfully',
                              returnLog,
                              bookUpdate,
                              userUpdate
                            });
                            notification(
                              'Book returned successfully', userEmail,
                              'Hello Books'
                            );
                          });
                      });
                  });
              }
            });
        }
      });
  },

  /**
   * Gets a user's borrowed books
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {void}
   */
  getBorrowedBooks(req, res) {
    const {
      params: {
        userId
      }
    } = req;
    const {
      query: {
        returned: isReturned
      }
    } = req;

    if (!userId) {
      ResponseHandler(req, res, 400, false, 'Oops! Userid is required!', null, null);
      return;
    }

    if (isReturned == null) {
      return BorrowLog
        .findAll({
          include: [{
            model: models.User
          },
          {
            model: models.Book
          }
          ],
          where: {
            user_id: userId,
            returned: false
          }
        })
        .then((booklog) => {
          if (booklog.length !== 0) {
            ResponseHandler(
              req, res, 200, true, 'You have borrowed some books!',
              booklog, 'booklog'
            );
          } else {
            ResponseHandler(
              req, res, 200, true, 'You have not borrowed any book!',
              booklog, 'booklog'
            );
          }
        })
        .catch((error) => {
          ResponseHandler(
            req, res, 400, true, 'Book not borrowed',
            error, 'error'
          );
        });
    }
    return BorrowLog
      .findAll({
        include: [{
          model: models.User
        },
        {
          model: models.Book
        }
        ],
        where: {
          returned: isReturned,
          user_id: userId
        }
      })
      .then((booklog) => {
        ResponseHandler(
          req, res, 200, true, 'Borrowed books pending return',
          booklog, 'booklog'
        );
      });
  }
};
