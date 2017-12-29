import validator from 'validator';

import models from '../models';
import emailController from '../../tools/Email';

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
   * Borrow book
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} borrow book
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
      res.status(400).send({
        success: false,
        message: 'Oops! Userid is required!'
      });
    }

    /**
     * Check if the bookId is null and insist on it
     */
    if (!bookId) {
      res.status(400).send({
        success: false,
        message: 'Oops! BookId is required!'
      });
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
          res.status(404).send({
            success: false,
            message: 'Book does not exist'
          });
        } else if (book.quantity === 0) {
          res.status(404).send({
            success: false,
            message: 'Book is no longer available'
          });
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
                res.status(400).send({
                  success: false,
                  message: 'You have already borrowed this book'
                });
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
                  .then(borrowDetails =>
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
                      .then(
                        res.status(200).send({
                          success: true,
                          message: 'Book borrowed successfully',
                          borrowDetails
                        }),
                        notification('Book borrowed successfully', userEmail, 'Hello Books')
                      ));
              }
            });
        }
      });
  },


  /**
   *
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Book response object
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
      res.status(400).send({
        success: false,
        message: 'Userid is required!'
      });
      return;
    }


    if (!bookId) {
      res.status(400).send({
        success: false,
        message: 'BookId is required!'
      });
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
          res.status(404).send({
            success: false,
            message: 'Book does not exist'
          });
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
                res.status(400).send({
                  success: false,
                  message: 'Oops! You have already returned this book!',
                });
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
   * @returns {Object} Response object
   * @param {Object} req
   * @param {Object} res
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

    if (userId == null || userId === '' || userId === undefined) {
      res.status(400).send({
        success: false,
        message: 'Oops! Userid is required!'
      });
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
            res.status(200).send({
              success: true,
              message: 'You have borrowed some books!',
              booklog
            });
          } else {
            res.status(400).send({
              success: true,
              message: 'You have not borrowed any book!',
              booklog
            });
          }
        })
        .catch(error => res.status(400).send(error));
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
        if (booklog.length !== 0) {
          res.status(200).send({
            success: true,
            message: 'You have pending books!',
            booklog
          });
        } else {
          res.status(200).send({
            success: true,
            message: 'You have no unreturned/pending books!',
            booklog
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }

};
