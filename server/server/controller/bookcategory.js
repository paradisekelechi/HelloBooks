import models from '../models';
const BookCategory = models.BookCategory;

export default {
    //view all books in the library
    getCategories(req, res) {
        return BookCategory
        .findAll()
        .then(bookcategory => res.status(201).send(bookcategory))
        .catch(error => res.status(400).send(error));
    },

    addCategory(req, res){
        let name = req.body.name;
        let description = req.body.description;
        let abbreviation = req.body.abbreviation;
        return BookCategory
        .create({
            name: name,
            abbreviation: abbreviation,
            description: description,
            deleted: false,
        })
        .then(bookcategory => {
            res.send({
                msg: 'Category added successfully'
            });
        })
        .catch(error => res.status(400).send(error));
    },    
};