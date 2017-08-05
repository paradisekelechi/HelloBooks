'use strict';
module.exports = function(sequelize, DataTypes) {
  var BorrowHistory = sequelize.define('BorrowHistory', {
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BorrowHistory;
};