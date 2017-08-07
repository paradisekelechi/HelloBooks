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
  return AccountType;
};