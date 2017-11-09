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

  AccountType.sync({
    force: true
  }).then(() => {
    AccountType.create({
      name: 'SILVER',
      description: 'A new user of the application',
      level: 1,
      deleted: false
    });
    AccountType.create({
      name: 'GOLD',
      description: 'An advanced user of the application',
      level: 2,
      deleted: false
    });
    AccountType.create({
      name: 'PLATINIUM',
      description: 'The highest user of the application with the highest priviledges',
      level: 3,
      deleted: false
    });
  });

  return AccountType;
};
