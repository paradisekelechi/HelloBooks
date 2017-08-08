//Import User model
import models from '../models'
const User = models.User;

import dotenv from 'dotenv';

//import  User from '../models';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


export default {
  signup(req, res) {
    let username = req.body.username;
    let email  = req.body.email;
    let password = req.body.password;

    if(username == null || username == '' || username == undefined){
        res.status(400).send({
            success: false,
            message: 'Oops! Username is required!'
        });
        return;
    }
    
    if(email == null || email == '' || email == undefined){
        res.status(400).send({
            success: false,
            message: 'Oops! Email is required!'
        });
        return;
    }

    const emailRegExp = /\S+@\S+\.\S+/;
    if(emailRegExp.test(email) == false){
        res.status(400).send({
            success: false,
            message: 'Oops! Enter a valid email address!'
        });
        return;
    }

    //Encrypt password using bcrypt js 
    bcrypt.hash(password, salt, (err, hashedPassword) => {
        return User
        .create({
            username: username,
            email: email,
            password: hashedPassword,
            usertype: 'USER',
            accounttype: 'silver',
            active: true,
            deleted: false,
            user_type_id: 1
        })
        .then(user => res.status(200).send({
            message: 'User Account Creation Successful',
            success: true
        }))
        .catch(error => res.status(400).send({
            success: false,
            message: 'Oops! User account not created'
        }));
    })    
  },

  signin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if(username == null || username == '' || username == undefined){
        res.status(400).send({
            success: false,
            message: 'Oops! Username is required!'
        });
        return;
    }
    
    if(password == null || password == '' || password == undefined){
        res.status(400).send({
            success: false,
            message: 'Oops! Password is required!'
        });
        return;
    }

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
                    res.status(200).send({user});
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