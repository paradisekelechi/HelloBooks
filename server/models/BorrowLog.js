

export default (sequelize, DataTypes) => {
  const BorrowLog = sequelize.define(
    'BorrowLog', {
      borrow_date: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            args: true,
            msg: 'Oops! borrow date should be a date'
          },
        },
      },
      return_date: {
        type: DataTypes.DATE,
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
    }
  );
  BorrowLog.associate = (models) => {
    BorrowLog.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
    BorrowLog.belongsTo(models.Book, { foreignKey: 'book_id', targetKey: 'id' });
  };
  return BorrowLog;
};

