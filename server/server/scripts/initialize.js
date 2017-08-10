import models from '../models';

//import all models
const UserType = models.UserType;
const AccountType = models.AccountType;
const BookCategory = models.BookCategory;

//Initialize Account type db data
AccountType.create({
    name: 'SILVER',
    description: 'A new user of the application',
    level: 1,
    deleted: false
  });
  AccountType.create({
    name: 'GOLD',
    description: 'An advanced user of the application',
    level: 2,
    deleted: false
  });
  AccountType.create({
    name: 'PLATINIUM',
    description: 'The highest user of the application with the highest priviledges',
    level: 3,
    deleted: false
  });

  
  //Initialize Usertype database data
UserType.create({
    name: 'USER',
    description: 'A basic user of the application',
    level: 1,
    deleted: false
  });
  UserType.create({
    name: 'ADMIN',
    description: 'Admin user of the application',
    level: 2,
    deleted: false
  });

  //Initialize Book Category database data
  BookCategory.create({
      name: 'OTHERS',
      abbreviation: 'OTH',
      description: 'Other unclassified books',
      deleted: false
  });
    BookCategory.create({
      name: 'NOVEL',
      abbreviation: 'NOV',
      description: 'Novels and prose works',
      deleted: false
  });
    BookCategory.create({
      name: 'DOCUMENTARIES',
      abbreviation: 'DOC',
      description: 'Documentaries and articles',
      deleted: false
  });