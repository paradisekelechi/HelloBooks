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
        .then(book => res.status(201).send(book))
        .catch(error => res.status(400).send(error));
    },

    addBook(req, res){
        let name = req.body.name;
        let author = req.body.author;
        let description = req.body.description;
        let categoryId = req.body.categoryId;
        let quantity = req.body.quantity;

        //checks on the category. If none is specified, the book is categorized as OTHERS with id 3. This is subject to modifications
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
            res.send({
                msg: 'Book successfully added',
                successful: true
            });
        })
        .catch(error => res.status(400).send(error));
    },

    editBook(req, res){
        let description = req.body.description;
        let quantity = req.body.quantity;
        let categoryId = req.body.categoryId;
        let bookId = req.body.bookid;
        let bookCover = req.body.image;
        
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
                status: true
            });
        })
        .catch(error => res.status(400).send(error));
    },

};