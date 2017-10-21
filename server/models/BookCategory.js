

export default (sequelize, DataTypes) => {
  const BookCategory = sequelize.define(
    'BookCategory', {
      name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true,
      },
      abbreviation: {
        type: DataTypes.STRING,
        unique: true,
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
    }
  );

  // BookCategory.sync({force: true}).then(() => {
  //     BookCategory.create({
  //       name: 'OTHERS',
  //       abbreviation: 'OTH',
  //       description: 'Other unclassified books',
  //       deleted: false
  //   });
  //     BookCategory.create({
  //       name: 'NOVEL',
  //       abbreviation: 'NOV',
  //       description: 'Novels and prose works',
  //       deleted: false
  //   });
  //     BookCategory.create({
  //       name: 'DOCUMENTARIES',
  //       abbreviation: 'DOC',
  //       description: 'Documentaries and articles',
  //       deleted: false
  //   });
  // });

  return BookCategory;
};

