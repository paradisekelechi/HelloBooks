import models from '../models';
import validator from 'validator';
const UserType = models.UserType;

/**
 * Export usertype controller methods
 */
export default {

    /**
     * Get all the usertypes 
     * @returns {null} description
     * @param {Request} req 
     * @param {Response} res 
     */
    getUserTypes(req, res) {
        return UserType
        .findAll({
            where: {
                deleted: false
            }
        })
        .then(usertype => {
            res.status(200).send({
                success: true,
                message: 'Usertypes gotten successfully',
                usertype
            })
        })
        .catch(error => {
            res.status(400).send(error)
        });
    },

    /**
     * Add a new usertype
     * @returns {null} description
     * @param {Request} req 
     * @param {Response} res 
     */
    addUserType(req, res){
        let name = req.body.name;
        let description = req.body.description;
        let level = req.body.level;

        if(validator.isEmpty(name+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Name cannot be empty'
            });
            return;
        }

        if(validator.isEmpty(description+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Description cannot be empty'
            });
            return;
        }

        if(validator.isEmpty(level+'')){
            res.status(400).send({
                success: false,
                message: 'Oops! Level cannot be empty'
            });
            return;
        }

        return UserType
        .create({
            name: name,
            level: level,
            description: description,
            deleted: false,
        })
        .then(() => {
            res.send({
                message: 'Usertype added successfully',
                success: true
            });
        })
        .catch(error => res.status(400).send(error));
    },    
};