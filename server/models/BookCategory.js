export default (sequelize, DataTypes) => {
  const BookCategory = sequelize
    .define('BookCategory', {
      name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
      }
    }, {
      freezeTableName: true,
    });
  return BookCategory;
};
