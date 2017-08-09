'use strict';

export default (sequelize, DataTypes) => {
  let UserType = sequelize.define('UserType', {
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

  // UserType.create({
  //   name: 'USER',
  //   description: 'A basic user of the application',
  //   level: 1,
  //   deleted: false
  // });
  // UserType.create({
  //   name: 'ADMIN',
  //   description: 'Admin user of the application',
  //   level: 2,
  //   deleted: false
  // });
  
  return UserType;
};

