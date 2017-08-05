'use strict';
module.exports = {
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
        unique: 'compositeIndex'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      usertype: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
      },
      accounttype: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // bookId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Book',
      //     key: 'bookid',
      //   },
      // },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};