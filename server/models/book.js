
export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book', {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
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
      borrowed: {
        type: DataTypes.BOOLEAN,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        isNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Book.associate = (models) => {
    Book.belongsTo(models.BookCategory, { foreignKey: 'category_id', targetKey: 'id' });
  };
  return Book;
};
