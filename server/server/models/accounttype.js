'use strict';

export default (sequelize, DataTypes) => {
  let AccountType = sequelize.define('AccountType', {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  // AccountType.create({
  //   name: 'SILVER',
  //   description: 'A new user of the application',
  //   level: 1,
  //   deleted: false
  // });
  // AccountType.create({
  //   name: 'GOLD',
  //   description: 'An advanced user of the application',
  //   level: 2,
  //   deleted: false
  // });
  // AccountType.create({
  //   name: 'PLATINIUM',
  //   description: 'The highest user of the application with the highest priviledges',
  //   level: 3,
  //   deleted: false
  // });
  return AccountType;
};