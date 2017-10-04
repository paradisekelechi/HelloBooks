'use strict';
//Import User model
//const Book = require('../models').Book;
console.log(Book);

export default {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1,10],
          isLowerCase: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6, Infinity]
        }
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      usertype: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      accounttype: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};