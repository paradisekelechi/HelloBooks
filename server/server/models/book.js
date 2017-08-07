'use strict';
module.exports = (sequelize, DataTypes) => {
  let Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    book_tag: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Book;
};