//Import User model
import models from '../models'
const User = models.User;

import dotenv from 'dotenv';
const config = dotenv.config();

import jwt from 'jsonwebtoken';
//Secret for authentication -- to be added to the environment as a variable
const secret = config.parsed.SECRET;

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

    if(password == null || password == '' || password == undefined){
        res.status(400).send({
            success: false,
            message: 'Oops! Password is required!'
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
            active: true,
            deleted: false,
            user_type_id: 1,
            account_type_id: 1
        })
        .then(user => {
            //token generated
            const token = jwt.sign({email: user.email, username: user.username, usertype: user.usertype, accounttype: user.accounttype}, secret, {expiresIn: 24 * 60 * 60 * 40}); 
            if(user){
                    res.status(200).send({    
                    message: 'User Account Creation Successful',
                    token: token,
                    success: true
                })
            }else{
                    res.status(400).send({    
                    message: 'User account not created',
                    token: token,
                    success: true
                })
            }
            
        })
        .catch(error => res.status(400).send(error));
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
                    //token generated
                    const token = jwt.sign({email: user.email, username: user.username, usertype: user.usertype, accounttype: user.accounttype}, secret, {expiresIn: 24 * 60 * 60 * 40});
                    
                    //token and user details sent to the user
                    res.status(200).send({
                        success: true,
                        message: 'User successfully signed in ',
                        token: token
                    });
                }else{
                    res.status(400).send({
                        message: 'Oops! Password is incorrect',
                        success: false
                    });
                }
             });
        }else{
            res.status(400).send({
                message: 'Oops! Username does not exist',
                success: false
            });
        }
    })
      .catch(error => res.status(400).send({
          message: 'Oops! User does not exist',
          success: false
      }));
  },

};