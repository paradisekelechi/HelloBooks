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
        let bookTag = makeBookTag(name);
        let description = req.body.description;
        let category = req.body.category;
        let quantity = 1;
        if(req.body.quantity){
            quantity = req.body.quantity;
        }
        return Book
        .create({
            name: name,
            description: description,
            bookTag: '',
            quantity: quantity,
            deleted: false,
            category_id: category
        })
        .then(book => {
            res.send({
                msg: 'Udo'
            });
        })
        .catch(error => res.status(400).send(error));
    },

    editBook(req, res){
        let description = req.body.description;
        let quantity = req.body.quantity;
        let category = req.body.category;
        let bookId = req.body.bookid;
        let bookCover = req.body.cover;
        console.log(bookId);
        return Book
        .update({
            description: description,
            quantity: quantity,
            category_id: category,
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

// //internal function to make book tag
// let makeBookTag = (bookName) => {
//     if(bookName.length > 0){
//         let book = bookName.trim().toString();
//         let bookTag = 'HBK' +'-'+ book.substring(1, 3)+'-'+book.substring(0, 2);
//         return bookTag;
//     }
// }