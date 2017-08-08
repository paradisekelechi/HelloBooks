//Import User model
import models from '../models'
const User = models.User;

import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

//Secret for authentication -- to be added to the environment as a variable
const secret = 'Jm7MmG6YrssZemeHxG0h';


//import  User from '../models';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


export default {
  signup(req, res) {
    let username = req.body.username;
    let email  = req.body.email;
    let password = req.body.password;
    
    //Encrypt password using bcrypt js 
    bcrypt.hash(password, salt, (err, hashedPassword) => {
        return User
        .create({
            username: username,
            email: email,
            password: hashedPassword,
            active: true,
            deleted: false,
            user_type_id: 1,
            account_type_id: 1
        })
        .then(user => res.status(201).send({
            message: 'User Account Creation Successful',
            isSuccessful: true
        }))
        .catch(error => res.status(400).send(error.errors));
    })    
  },

  signin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    return User
    .findOne({
        where: {
            username: username,
        },
        include: [{model: models.UserType}, {model: models.AccountType}]
    })
    .then(user => {
        if(user){
             bcrypt.compare(password, user.password, (err, success)=>{
                if(success){
                    //token generated
                    const token = jwt.sign({email: user.email, username: user.username, usertype: user.usertype, accounttype: user.accounttype}, secret, {expiresIn: 24 * 60 * 60});
                    
                    //token an user details sent to the user
                    res.status(200).send({
                        token: token, user
                    });
                }else{
                    res.status(400).send({
                        msg: 'Oops! Password is incorrect'
                    });
                }
             });
        }else{
            res.status(400).send({
                msg: 'Oops! Username does not exist'
            });
        }
    })
      .catch(error => res.status(400).send({
          message: 'User does not exist',
          status: false
      }));
  },
};