import models from '../models';
const BookCategory = models.BookCategory;

export default {
    //view all books in the library
    getCategories(req, res) {
        return BookCategory
        .findAll()
        .then(bookcategory => {
            res.status(200).send({
                success: true,
                message: 'Book category successfully gotten',
                bookcategory
            });
        })
        .catch(error => {
            res.status(400).send({
                success: false,
                message: 'Book category not successfully gotten',
                error
            });
        });
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
        .then(() => {
            res.status(200).send({
                message: 'Book category added',
                success: true
            });
        })
        .catch(error => {
            res.status(400).send({
                message: 'Book cactegory not added',
                success: false,
                error
            })
        });
    },    
};