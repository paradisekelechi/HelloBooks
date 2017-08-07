//Import User model
import models from '../models'
const User = models.User;

import dotenv from 'dotenv';

//import  User from '../models';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


module.exports = {
  signup(req, res) {
    let username = req.body.username;
    let email  = req.body.email;
    let password = req.body.password;
    //let hashedPassword = bcrypt.hashSync(password, salt);
    //console.log(dotenv.load());

    bcrypt.hash(password, salt, (err, hashedPassword) => {
        return User
        .create({
            username: username,
            email: email,
            password: hashedPassword,
            usertype: 'USER',
            accounttype: 'silver'
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
        }
    })
    .then(user => {
        if(user){
             bcrypt.compare(password, user.password, (err, success)=>{
                if(success){
                    res.status(200).send({
                        msg: 'Peace'
                    });
                }else{
                    res.status(400).send({
                        msg: 'Password incorrect'
                    });
                }
             });
        }else{
            res.status(400).send({
                msg: 'user exists'
            });
        }
    })
      .catch(error => res.status(400).send({
          message: 'User does not exist',
          status: false
      }));
  },

};