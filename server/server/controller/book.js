const Book = require('../models').Book;

module.exports = {
    //admin add a new book
  addBook(req, res) {
    let name = req.body.bookname;
    let description = req.body.description;
    let bookTag = makeBookTag(name);
    
    let category = req.body.category;
    let quantity = 1;
    
    if(!bookIsAvailable(bookTag)){
        return Book
        .create({
            name: name,
            book_tag: bookTag,
            quanatity: 1,

        })
        .then(book => res.status(201).send(book))
        .catch(error => res.status(400).send(error));
    }
  },

    //view all books in the library
    getAllBooks(req, res) {
        return Book
        .findAll()
        .then(book => res.status(201).send(book))
        .catch(error => res.status(400).send(error));
    },

}

//internal function to make book tag
let makeBookTag = (bookName) => {
    if(bookName.length > 0){
        let book = bookName.trim().toString();
        let bookTag = 'HBK' +'-'+ book.substring(1, 3)+'-'+book.substring(0, 2);
        console.log(bookTag);
        return bookTag;
    }
}

//check if book is available 
let bookIsAvailable = (bookTag) => {
    Book.findOne({
        where: {
            book_tag: bookTag
        }
    })
    .then(book =>{
        if(book){
            console.log('book exists');
            return true;
        }else{
            console.log('book does not exists');
            return false;
        }
    });
}