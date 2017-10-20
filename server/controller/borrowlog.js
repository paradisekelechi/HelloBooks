//Import modules 
import models from '../models';
import validator from 'validator';
import dotenv from 'dotenv';
import emailController from './email.js';
const notification = emailController.notification;


const config = dotenv.config();
const BorrowLog = models.BorrowLog;
const Book = models.Book;
const User = models.User;

export default {    
    borrowBook(req, res){
        let today = new Date();
        let borrowDate = today;

        const userEmail = req.email;

        let returnDate = validator.isEmpty(req.body.return_date+'') || req.body.return_date == null? new Date(today.getTime() + 24 * 60 * 60 * 1000 * config.parsed.BORROW_VALIDITY_IN_DAYS): new Date(req.body.return_date);
        
        let userId = req.params.userId;
        let bookId = req.body.bookId;

        /**
         * Check if the userId is null and insist on it
         */
        if(userId == null || userId == '' || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! Userid is required!'
            });
        }

        /**
         * Check if the bookId is null and insist on it
         */
        if(bookId == null || bookId == '' || bookId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! BookId is required!'
            });
            return;
        }
        
        //Check for the availability of the book
        return Book
        .find({
            where: {
                id: bookId
            }
        })
        .then(book => {
            
            //If the book exists
            if(book){

                //Check if the book still available for borrow
                if(book.quantity == 0){
                    res.status(400).send({
                        success: false,
                        message: 'Oops! This book is no longer available for borrow'
                    });
                }else{
                    //Check if the user had already borrowed that book
                    return BorrowLog
                    .findAll({
                        include: [{model: models.User}, {model: models.Book}],
                        where: {
                            returned: false,
                            user_id: userId,
                            book_id: bookId
                        },
                        
                    })
                    .then(borrowlog => {
                        if(borrowlog.length != 0){
                            res.status(400).send({
                                message: 'Oops! Book has already been borrowed by you!',
                                success: false
                            });
                        }else{

                            //Borrow book by user
                            return BorrowLog
                            .create({
                                borrow_date: borrowDate,
                                return_date: returnDate,
                                returned: false,
                                deleted: false,
                                user_id: userId,
                                book_id: bookId,
                            })
                            .then(() => {
                                
                                //Update book quantity
                                return Book
                                .update({quantity: models.sequelize.literal('quantity - 1')},{where: {id: bookId}})
                                .then(
                                    res.status(200).send({
                                        success: true,
                                        message: 'Book borrowed successfully'
                                    }),
                                    notification('Book borrowed successfully', userEmail, 'Hello Books')
                                )
                                .catch(() => res.status(400).send({
                                    success: false,
                                    message: 'Oops! Book not borrowed successfully! Contact Support'
                                }));

                                    
                            })
                            .catch(() => res.status(400).send({
                                success: false,
                                message: 'Oops! Book not borrowed successfully!'
                            }));


                        }
                    })
                    .catch(() => res.status(400).send({
                        success: false,
                        message: 'Oops! Book not available!'
                    }));
                }
                
            }else{
                res.status(400).send({
                    success: false,
                    message: 'Oops! Book is not available in the library'
                });
            }
        })
        .catch(() => res.status(400).send({
            success: false,
            message: 'Oops! Book not available!'
        }));
        
    },


    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns {type} description
     */
    returnBook(req, res){
        let today = new Date();
        let returnDate = today;
        let userId = req.params.userId;
        let bookId = req.body.bookId;
        const userEmail = req.email;

        if(userId == null || userId == 0 || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Userid is required!'
            });
            return;
        }

        
        if(bookId == null || bookId == '' || bookId == undefined){
            res.status(400).send({
                success: false,
                message: 'BookId is required!'
            });
            return;
        }

        //Check if a user borrowed a book he/she is trying to return
        return BorrowLog
        .findAll({
            where: {
                user_id: userId,
                book_id: bookId,
                returned: false,
            }
        })
        .then(booklogger => {
            if(booklogger.length == 0){
                res.status(400).send({
                    success: false,
                    message: 'Oops! You are trying to return a  book you did not borrow!'
                });
            }else{
                
                return BorrowLog
                .findAll({
                    where: {
                        user_id: userId,
                        book_id: bookId,
                        returned: false,
                    },
                }).then(borrowhistory => {
                    if(borrowhistory.length != 0){
                        //Return Borrowed book
                        return BorrowLog
                        .update({
                            return_date: returnDate,
                            returned: true,
                            deleted: false
                        }, 
                        {
                            where: {
                                user_id: userId,
                                book_id: bookId,
                                returned: false
                            }
                        })
                        .then(() => {
                            
                            //Update book quantity accordingly
                            return Book
                            .update({quantity: models.sequelize.literal('quantity + 1')},{where: {id: bookId}})
                            .then(() => {
                                
                                //Update user use count for user account type profiling
                                return User
                                .update(
                                    {use_count: models.sequelize.literal('use_count + 1')},
                                    {where: {id: userId}}
                                )
                                .then(() => {
                                    res.status(200).send({
                                        success: true,
                                        message: 'Book returned successfully'
                                    }),
                                    notification('Book returned successfully', userEmail, 'Hello Books')
                                })
                                .catch(error => {
                                    res.status(400).send(error)
                                });
                            })
                            .catch(() => 
                                res.status(400).send({
                                success: false,
                                message: 'Oops! Book not returned successfully! Contact Support'
                            }));
                        })
                        .catch(() => res.status(400).send({
                            success: false,
                            message: 'Oops! Book not borrowed successfully! Contact Support'
                        }));
                    }else{
                        //Check if user had borrowed the book and had already returned it
                        return BorrowLog
                        .findAll({
                            where: {
                                user_id: userId,
                                book_id: bookId,
                                returned: true,
                            },
                        })
                        .then(booklogobj => {
                            if(booklogobj.length != 0){
                                res.status(400).send({
                                    success: false,
                                    message: 'Oops! You have already returned this book!',
                                    booklogobj
                                });
                            }else{
                                res.status(400).send({
                                    success: false,
                                    message: 'You have borrowed this book!',
                                    booklogobj
                                });
                            }
                            
                        })
                        .catch(() => res.status(400).send({
                            success: false,
                            message: 'Oops! Borrow log data unavailable! Contact Support'
                        }));
                    }
                })


            }
        })
        .catch(() => res.status(400).send({
            success: false,
            message: 'Oops! Borrow log data unavailable! Contact Support'
        }));

        

    },

    /**
     * @returns {type} description
     * @param {Request} req 
     * @param {Response} res 
     */
    getBorrowedBooks(req, res){
        let userId = req.params.userId;
        let isReturned = req.query.returned;

        if(userId == null || userId == '' || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! Userid is required!'
            });
            return;
        }

        if(isReturned == null){
            return BorrowLog
            .findAll({
                include: [
                    {model: models.User},
                    {model: models.Book}
                ],
                where: {
                    user_id: userId
                }
            })
            .then(booklog => {
                if(booklog.length != 0){
                    res.status(200).send({
                        success: true,
                        message: 'You have borrowed some books!',
                        booklog
                    })
                }else{
                    res.status(400).send({
                        success: true,
                        message: 'You have not borrowed any book!',
                        booklog
                    })
                }
                
            })
            .catch(error => res.status(400).send(error));

        }else{
            return BorrowLog
            .findAll({
                include: [
                    {model: models.User},
                    {model: models.Book}
                ],
                where: {
                    returned: isReturned,
                    user_id: userId
                }
            })
            .then(booklog => {
                if(booklog.length != 0){
                    res.status(200).send({
                        success: true,
                        message: 'You have pending books!',
                        booklog
                    })
                }else{
                    res.status(200).send({
                        success: true,
                        message: 'You have no unreturned/pending books!',
                        booklog
                    })
                }
                
            })
            .catch(error => res.status(400).send(error));
        }

        
    }

};