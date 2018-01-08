/**
 *  @fileOverview Script that seeds the test database of initial data
 *
 *  @author Paradise Kelechi
 *
 * @requires ../models
 */

import models from '../models';

/**
 * Import all models
 */
const {
  User,
  Book
} = models;

const usersData = [{
  username: 'username',
  email: 'email@email.com',
  password: 'password',
  image: '',
  use_count: 5,
  active: true,
  deleted: false,
  user_type_id: 1,
  account_type_id: 1
},
{
  username: 'user',
  email: 'test@email.com',
  password: 'password',
  image: '',
  use_count: 5,
  active: true,
  deleted: false,
  user_type_id: 2,
  account_type_id: 1
}
];

User.sync({
  force: true
})
  .then(() => {
    usersData.forEach((user) => {
      User.create(user);
    });
  });


const booksData = [{
  name: 'book1',
  author: 'author1',
  description: 'book that is awesome',
  cover: null,
  quantity: 5,
  borrowed: false,
  deleted: false,
  category_id: 1
},
{
  name: 'book2',
  author: 'author2',
  description: 'book that is great',
  cover: null,
  quantity: 1,
  borrowed: true,
  deleted: false,
  category_id: 2
}
];

Book.sync({
  force: true
})
  .then(() => {
    booksData.forEach((book) => {
      Book.create(book);
    });
  });
