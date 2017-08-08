import models from '../models';
const BorrowLog = models.BorrowLog;

export default {
    
    borrowBook(req, res){
        let borrowDate = req.body.borrow_date == null? new Date(): new Date(req.body.borrow_date);
        let returnDate = req.body.return_date == null? new Date(): new Date(req.body.return_date);
        let userId = req.params.userId;
        let bookId = req.body.bookId;
        return BorrowLog
        .create({
            borrow_date: borrowDate,
            return_date: returnDate,
            returned: false,
            deleted: false,
            UserId: userId,
            BookId: bookId,
        })
        .then(booklog => {
            res.status(200).send({
                msg: 'Book borrowed'
            });
        })
        .catch(error => res.status(400).send(error));
    },

    returnBook(req, res){
        let returnDate = req.body.returnDate;
        let userId = req.params.userId;
        let bookId = req.body.bookId;
        let borrowId = req.body.borrowId;
        return BorrowLog
        .update({
            return_date: returnDate,
            returned: true,
            deleted: false
        }, {
            where: {
                id: borrowId,
                UserId: userId, 
                BookId: bookId
            }
        })
        .then(booklog => {
            res.status(200).send({
                msg: 'Book returned'
            });
        })
        .catch(error => res.status(400).send(error));
    },

    getPendingBooks(req, res){
        let userId = req.params.userId;
        console.log(userId);
        return BorrowLog
        .findAll({
            include: [{
                all: true
            }],
            where: {
                UserId: userId, 
                returned: false
            }
        })
        .then(booklog => {
            res.status(200).send(booklog)
        })
        .catch(error => res.status(400).send(error));
    }

};