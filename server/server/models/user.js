'use strict';
//const Book = require('../models').Book;
export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      notNull: true,
      is: /^[a-z]+$/i,
      len: [2, 12],
      validate: {
          is: {
              args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
              msg: 'Username must start with a letter, have no spaces, and be 3 - 40 characters.'
          },
          len: {
            args: [2, 12],
            msg: 'Username should be between 2 to 12 characters in length'
          },
      },
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Oops, enter a valid email address'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        }
      }
    },
    usertype: {
      type:   DataTypes.ENUM,
      values: ['ADMIN', 'USER',],
      //type: DataTypes.STRING,
      //notNull: false,
    },
    image: {
      type: DataTypes.STRING,
      notNull: false,
    },
    accounttype: {
      type: DataTypes.STRING,
      notNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Account Type must not be empty'
        }
      }
    } 
  });

  User
  return User;
};

