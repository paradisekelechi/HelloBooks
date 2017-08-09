'use strict';

export default (sequelize, DataTypes) => {
  let UserType = sequelize.define('UserType', {
    name: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  return UserType;
};

