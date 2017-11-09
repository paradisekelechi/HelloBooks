export default (sequelize, DataTypes) => {
  const AccountType = sequelize
    .define('AccountType', {
      name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        notNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
      }
    }, {
      freezeTableName: true,
    });
  return AccountType;
};
