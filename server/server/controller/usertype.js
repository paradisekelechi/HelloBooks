import models from '../models';
const UserType = models.UserType;

export default {

    getUserTypes(req, res) {
        return UserType
        .findAll()
        .then(usertype => res.status(201).send(usertype))
        .catch(error => res.status(400).send(error));
    },

    addUserType(req, res){
        let name = req.body.name;
        let description = req.body.description;
        let level = req.body.level;
        return UserType
        .create({
            name: name,
            level: level,
            description: description,
            deleted: false,
        })
        .then(usertype => {
            res.send({
                msg: 'Usertype added successfully'
            });
        })
        .catch(error => res.status(400).send(error));
    },    
};