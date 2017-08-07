'use strict';

export default (sequelize, DataTypes) => {
  let BorrowLog = sequelize.define('BorrowLog', {
    borrow_date: {
      type: DataTypes.DATE,
      notNull: true,
      validate: {
          isDate: {
              args: true,
              msg: 'Oops! borrow date should be a date'
          },
      },
    },
    return_date: {
      type: DataTypes.DATE,
      notNull: true,
      validate: {
          isDate: {
              args: true,
              msg: 'Oops! Return date should be a date'
          },
      },
    },
    returned: {
      type: DataTypes.BOOLEAN,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  return BorrowLog;
};

