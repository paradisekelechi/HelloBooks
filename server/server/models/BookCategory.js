'use strict';

export default (sequelize, DataTypes) => {
  let BookCategory = sequelize.define('BookCategory', {
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    abbreviation: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  return BookCategory;
};

