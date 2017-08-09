import models from '../models';
const Book = models.Book;

export default {
    //view all books in the library
    getBooks(req, res) {
        return Book
        .findAll({
            include: [{
                model: models.BookCategory,
            }],
        })
        .then(book => res.status(200).send({
            success: true,
            message: 'Books obtained successfully',
            book
        }))
        .catch(error => res.status(400).send({
            success: true,
            message: 'Oops! Books list not gotten'
        }));
    },

    addBook(req, res){
        let name = req.body.name;
        let author = req.body.author;
        let description = req.body.description;
        let categoryId = req.body.categoryId;
        let quantity = req.body.quantity;

        //checks if the name is undefined or null and insists on it
        if(name == null || name == '' || name == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops, book name cannot be null'
            });
            return;
        }

        //checks if the author is undefined or null and insists on it
        if(author == null || author == '' || author == undefined){
            res.status(400).send({
                success: false,
                message: 'Oops, author cannot be null'
            });
            return;
        }

        //Checks the category. If none is specified, the book is categorized as OTHERS with id 1. This is subject to modifications
        if(categoryId == '' || categoryId == null){
            categoryId = 1;
        }
        //Checks on quantity. If no quantity is indicated, it is assumed that quantity added is 1.
        if(quantity == null || quantity == ''){
            quantity = 1;
        }

        return Book
        .create({
            name: name,
            description: description,
            author: author,
            quantity: quantity,
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
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Book not successfully added'
        }));
    },

    editBook(req, res){
        let description = req.body.description;
        let quantity = req.body.quantity;
        let categoryId = req.body.categoryId;
        let bookId = req.params.bookId;
        console.log(bookId);
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
        .then(book => {
            res.status(200).send({
                message: 'Book edited successfully',
                success: true
            });
        })
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! Book not edited successfully'
        }));
    },

};