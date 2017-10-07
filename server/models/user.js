'use strict';

export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      notNull: {
        args: true,
        msg: 'Username is required'
      },
      unique: {
        args: true,
        msg: 'Username must be unique'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email is required'
      },
      unique: {
        args: true,
        msg: 'Email already existing in the system'
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
    },
    image: {
      type: DataTypes.STRING,
      notNull: false,
    },
    use_count:{
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  User.associate = (models) => {
    User.belongsTo(models.UserType, {foreignKey: 'user_type_id', targetKey: 'id'});
    User.belongsTo(models.AccountType, {foreignKey: 'account_type_id', targetKey: 'id'});
  }
  return User;
};

