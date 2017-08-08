'use strict';

export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      validate: {
          is: {
              args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
              msg: 'Oops! Username should contain letters only'
          },
          len: {
            args: [2, 12],
            msg: 'Username should be between 2 to 12 characters in length'
          },
      },
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Oops, enter a valid email address'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Oops! Password must not be empty'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      notNull: false,
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

