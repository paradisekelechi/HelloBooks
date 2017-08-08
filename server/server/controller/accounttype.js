import models from '../models';
const AccountType = models.AccountType;

export default {

    getAccountTypes(req, res) {
        return AccountType
        .findAll()
        .then(accounttype => res.status(201).send(accounttype))
        .catch(error => res.status(400).send(error));
    },

    addAccountType(req, res){
        let name = req.body.name;
        let description = req.body.description;
        let level = req.body.level;
        return AccountType
        .create({
            name: name,
            level: level,
            description: description,
            deleted: false,
        })
        .then(accounttype => {
            res.send({
                msg: 'Accounttype added successfully'
            });
        })
        .catch(error => res.status(400).send(error));
    },    
};