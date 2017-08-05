'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    usertype: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.Book, {
        //   foreignKey: 'id',
        //   as: 'books',
        // });
      }
    }
  });
  return User;
};