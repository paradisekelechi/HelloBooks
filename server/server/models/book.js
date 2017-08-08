'use strict';
export default (sequelize, DataTypes) => {
  let Book = sequelize.define('Book', {
    name: {
      type: DataTypes.STRING,
      isNull: false,
      notNull: true,
      validate: {
        isNull: {
          args: false,
          msg: 'Oops, book name cannot be empty'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      isNull: false,
      notNull: true,
      validate: {
        isNull: {
          args: false,
          msg: 'Oops, author cannot be empty'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      isNull: false,
    },
  }, 
  {
    freezeTableName: true,
  });
  Book.associate = (models) => {
    Book.belongsTo(models.BookCategory, {foreignKey: 'category_id', targetKey: 'id'});
  }
  return Book;
};