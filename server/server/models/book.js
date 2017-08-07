'use strict';
export default (sequelize, DataTypes) => {
  let Book = sequelize.define('Book', {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    booktag: {
      type: DataTypes.STRING,
      notNull: true,
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
      notNull: true,
    },
  }, 
  {
    freezeTableName: true,
  });
  Book.associate = (models) => {
    Book.belongsToMany(models.User, {through: 'BorrowLog'});
    Book.belongsTo(models.BookCategory, {foreignKey: 'category_id', targetKey: 'id'});
  }
  return Book;
};