export default (sequelize, DataTypes) => {
  const UserType = sequelize
    .define('UserType', {
      name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
      }
    }, {
      freezeTableName: true,
    });

  return UserType;
};
