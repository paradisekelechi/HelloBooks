import models from '../models';
const BorrowLog = models.BorrowLog;
const Book = models.Book;

//console.log(models);

export default {
    
    borrowBook(req, res){
        let today = new Date();
        let borrowDate = req.body.borrow_date == null? today : new Date(req.body.borrow_date);
        let returnDate = req.body.return_date == null? new Date(today.getTime() + 24 * 60 * 60 * 7000): new Date(req.body.return_date);
        let userId = req.params.userId;
        let bookId = req.body.bookId;

        if(userId == null || userId == '' || userId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! Userid is required!'
            });
        }

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
                    res.status(200).send({
                        success: false,
                        message: 'Oops! This book is no longer available for borrow'
                    });
                }else{

                    //Check if the user had already borrowed that book
                    BorrowLog
                    .find({
                        include: [{model: models.User, where: {id: userId}}, {model: models.Book, where: {id: bookId}}],
                        where: {
                            returned: false,
                        }
                    })
                    .then(borrowlog => {
                        if(borrowlog){
                            res.status(400).send({
                                message: 'Oops! Book has already been borrowed by you!',
                                borrowlog
                            });
                        }
                    })
                    .catch(error => res.status(400).send({
                        success: false,
                        message: 'Oops! Book not available!'
                    }));
                }
                
            }else{
                res.status(400).send({
                    message: 'Oops! Book is not available in the library'
                });
            }
        })
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Book not available!'
        }));


        //Check if the user had already borrowed that book
        return BorrowLog
        .findAll({
            where: {
                returned: false,
                user_id: userId
            }
        })
        .then(borrowlog => {
            if(borrowlog){
                res.status(400).send({
                    message: 'Oops! Book has already been borrowed by you!'
                });
            }
        })
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Book not available!'
        }));



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
                    success: false,
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
    },

    returnBook(req, res){
        let today = new Date();
        let returnDate = today;
        let userId = req.params.userId;
        let bookId = req.body.bookId;
        let borrowId = req.body.borrowId;

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

        if(borrowId == null || borrowId == '' || borrowId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops! BorrowId is required!'
            });
            return;
        }

        return BorrowLog
        .update({
            return_date: returnDate,
            returned: true,
            deleted: false
        }, 
        {
            include: [{model: models.User, where: {id: userId}}, {model: models.Book, where: {id: bookId}}],
            where: {
                id: borrowId,
            }
        })
        .then(booklog => {
            //Update book quantity
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
        .catch(error => res.status(400).send(error));
    },

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
                {model: models.User, where: {id: userId}},
                {model: models.Book}
            ],
            where: {
                returned: isReturned
            }
        })
        .then(booklog => {
            res.status(200).send({
                success: true,
                booklog
            })
        })
        .catch(error => res.status(400).send(error));
    }

};