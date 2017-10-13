import models from '../models';
import validator from 'validator';
const Book = models.Book;

export default {
    //view all books in the library
    getBooks(req, res) {
        return Book
        .findAndCountAll(
            {
                where:{
                    deleted: false,
                }
            },
            {
            include: [{
                model: models.BookCategory,
            }],
        })
        .then(book => res.status(200).send({
            success: true,
            message: 'Books obtained successfully',
            book
        }))
        .catch(() => {
            return res.status(400).send({
                message: 'Error getting books'
            });
        });
    },

    //view all books in the library by category
    getBookByCategory(req, res) {
        let categoryId = req.params.categoryId;

        if(categoryId == null){
            res.status(200).send({
                success: false,
                message: 'Book category Id is required'
            });
            return;
        }
        return Book
        .findAll(
            {
                where: {
                    category_id: categoryId,
                    deleted: false
                }
            },
            {
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

    getFinishedBooks(req, res) {
        return Book
        .findAll(
            {
                where:{
                    deleted: false,
                    quantity: 0
                }
            },
            {
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

    getBooksByBorrowStatus(req, res) {
        let borrowStatus = req.query.borrowed;
        return Book
        .findAll(
            {
                where:{
                    deleted: false,
                    borrowed: borrowStatus
                }
            },
            {
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

    addBook(req, res){
        let name = req.body.name;
        let author = req.body.author;
        let description = req.body.description;
        let categoryId = req.body.categoryId;
        let quantity = req.body.quantity;
        let image = req.body.image;

        

        //checks if the name is undefined or null and insists on it
        if(validator.isEmpty(name+'') || name == null){
            res.status(400).send({
                success: false,
                message: 'Book name is required'
            });
            return;
        }else{
            name = validator.trim(name+'');
        }

        //checks if the author is undefined or null and insists on it
        if(validator.isEmpty(author+'') || author == null){
            res.status(400).send({
                success: false,
                message: 'Book author is required'
            });
            return;
        }else{
            author = validator.trim(author+'');
        }


        //checks if the quantity is empty or null and insists on it
        if(validator.isEmpty(quantity+'') || quantity == null){
            res.status(400).send({
                success: false,
                message: 'Quantity is required'
            });
            return;
        }else{
            quantity = parseInt(quantity);
        }

        //checks if the categoryId is empty or null and insists on it
        if(validator.isEmpty(categoryId+'') || categoryId == null){
            res.status(400).send({
                success: false,
                message: 'Category is required'
            });
            return;
        }else{
            categoryId = parseInt(categoryId);
        }

        image = validator.trim(image+'');

        return Book
        .create({
            name: name,
            description: description,
            author: author,
            quantity: quantity,
            cover: image,
            borrowed: false,
            deleted: false,
            category_id: categoryId
        })
        .then(book => {
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

    editBook(req, res){
        let description = req.body.description;
        let quantity = req.body.quantity;
        let categoryId = req.body.categoryId;
        let bookId = req.params.bookId;
        let bookCover = req.body.image;

        if(bookId == null || bookId == 0 || bookId == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops!! BookId cannot be '+ bookId
            });
            return;
        }
        
        return Book
        .update({
            description: description,
            quantity: quantity,
            category_id: categoryId,
            cover: bookCover
        }, 
        {
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