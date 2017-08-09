import models from '../models';
const BorrowLog = models.BorrowLog;
const Book = models.Book;

//console.log(models);

export default {
    
    borrowBook(req, res){
        let today = new Date();
        //Today is the borrow date
        let borrowDate = today;
        //If the return date is not sent, the return date is set to be 7 days from borrow
        let returnDate = req.body.return_date == null? new Date(today.getTime() + 24 * 60 * 60 * 7000): new Date(req.body.return_date);
        
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
                                borrowlog
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
                            .then(booklog => {
                                
                                //Update book quantity
                                return Book
                                .update({quantity: models.sequelize.literal('quantity - 1')},{where: {id: bookId}})
                                .then(
                                    res.status(200).send({
                                        success: true,
                                        message: 'Book borrowed successfully'
                                    }),
                                )
                                .catch(error => res.status(400).send({
                                    success: false,
                                    message: 'Oops! Book not borrowed successfully! Contact Support'
                                }));

                                    
                            })
                            .catch(error => res.status(400).send({
                                success: false,
                                message: 'Oops! Book not borrowed successfully!'
                            }));


                        }
                    })
                    .catch(error => res.status(400).send({
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
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Book not available!'
        }));
        
    },


    /**
     * Return Book method
     * @param {Request parameter} req 
     * @param {Response parameter} res 
     */
    returnBook(req, res){
        let today = new Date();
        let returnDate = today;
        let userId = req.params.userId;
        let bookId = req.body.bookId;

        if(userId == null || userId == '' || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! Userid is required!'
            });
            return;
        }

        
        if(bookId == null || bookId == '' || bookId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! BookId is required!'
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
        .then(booklog => {
            if(booklog.length == 0){
                res.status(400).send({
                    success: false,
                    message: 'Oops! You are trying to return a  book you did not borrow!'
                });
            }else{
                //Check if user had borrowed the book and had already returned it
                return BorrowLog
                .findAll({
                    where: {
                        user_id: userId,
                        book_id: bookId,
                        returned: true,
                    }
                })
                .then(booklog => {
                    if(booklog.length != 0){
                        res.status(400).send({
                            success: false,
                            message: 'Oops! You have already returned this book!'
                        });
                    }else{

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
                        .then(borrowlog => {
                            
                            //Update book quantity accordingly
                            return Book
                            .update({quantity: models.sequelize.literal('quantity + 1')},{where: {id: bookId}})
                            .then(
                                res.status(200).send({
                                    success: false,
                                    message: 'Book returned successfully'
                                }),
                            )
                            .catch(error => res.status(400).send({
                                success: false,
                                message: 'Oops! Book not returned successfully! Contact Support'
                            }));
                        })
                        .catch(error => res.status(400).send({
                            success: false,
                            message: 'Oops! Book not borrowed successfully! Contact Support'
                        }));

                    }
                    
                })
                .catch(error => res.status(400).send({
                    success: false,
                    message: 'Oops! Borrow log data unavailable! Contact Support'
                }));
            }
        })
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Borrow log data unavailable! Contact Support'
        }));

    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getPendingBooks(req, res){
        let userId = req.params.userId;
        let isReturned = req.query.returned;

        if(userId == null || userId == '' || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! Userid is required!'
            });
            return;
        }

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

};