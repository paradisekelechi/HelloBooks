import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/Routes';
import {
  name,
  author,
  description,
  categoryId,
  image,
  quantity
} from './TestData';

const {
  signin,
  getBooks,
  getSingleBook,
  getBooksAvailable,
  getBooksDeleted,
  getBooksFinished,
  addBooks
} = routes;

let newBookId;
const {
  assert
} = chai;
const request = supertest(app);

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

let adminToken;

describe('Add book Route', () => {
  it('should be able to signin', (done) => {
    request
      .post(signin)
      .send({
        username,
        password
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.token);
        assert.exists(res.body.message);
        assert.exists(res.body.accounttype);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User successfully signed in ');
        assert.equal(res.status, 200);
        adminToken = res.body.token;
        done();
      });
  });

  it('should be able to add a book', (done) => {
    request
      .post(addBooks)
      .set('user-token', adminToken)
      .send({
        name,
        author,
        description,
        categoryId,
        quantity,
        image
      })
      .end((err, res) => {
        newBookId = res.body.book.id;
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book successfully added');
        assert.equal(res.body.book.name, name);
        assert.equal(res.body.book.author, author);
        assert.equal(res.body.book.quantity, quantity);
        assert.equal(res.body.book.category_id, categoryId);
        done();
      });
  });

  it('should not be able to add a book', (done) => {
    request
      .post(addBooks)
      .send({
        name,
        author,
        description,
        categoryId,
        quantity,
        image
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'User token is not provided');
        done();
      });
  });

  it('should not be able to add a book', (done) => {
    request
      .post(addBooks)
      .set('user-token', adminToken)
      .send({
        author,
        description,
        categoryId,
        quantity,
        image
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book name is required');
        done();
      });
  });

  it('should not be able to add a book', (done) => {
    request
      .post(addBooks)
      .set('user-token', adminToken)
      .send({
        name,
        description,
        categoryId,
        quantity,
        image
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book author is required');
        done();
      });
  });

  it('should not be able to add a book', (done) => {
    request
      .post(addBooks)
      .set('user-token', adminToken)
      .send({
        name,
        author,
        description,
        quantity,
        image
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Category is required');
        done();
      });
  });
});
describe('Get Books ', () => {
  it('should get all books', (done) => {
    request
      .get(getBooks)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.book);
        assert.exists(res.body.book.count);
        assert.exists(res.body.book.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Books obtained successfully');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.book.rows);
        done();
      });
  });
});

describe('Get Available Books ', () => {
  it('should get all available books', (done) => {
    request
      .get(getBooksAvailable)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.book);
        assert.exists(res.body.book.count);
        assert.exists(res.body.book.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Books obtained successfully');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.book.rows);
        done();
      });
  });
});

describe('Get Deleted Books ', () => {
  it('should get all deleted books', (done) => {
    request
      .get(getBooksDeleted)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.book);
        assert.exists(res.body.book.count);
        assert.exists(res.body.book.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Books obtained successfully');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.book.rows);
        done();
      });
  });
});

describe('Get Finished Books ', () => {
  it('should get all finished books', (done) => {
    request
      .get(getBooksFinished)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.book);
        assert.exists(res.body.book.count);
        assert.exists(res.body.book.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Books obtained successfully');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.book.rows);
        done();
      });
  });
});

describe('Get Single Book ', () => {
  it('should get a single book', (done) => {
    request
      .get(`${getSingleBook}?id=84`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.book);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Book obtained successfully');
        assert.equal(res.body.success, true);
        done();
      });
  });
});

describe('Edit Book Route', () => {
  it('should edit book', (done) => {
    request
      .put(`${addBooks}/1`)
      .set('user-token', adminToken)
      .send({
        category_id: 2
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book edited successfully');
        done();
      });
  });
  it('should not edit book', (done) => {
    request
      .put(`${addBooks}/1`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'No data to edit');
        done();
      });
  });
});

describe('Delete Book Route', () => {
  it('should delete book', (done) => {
    request
      .delete(`${addBooks}/${newBookId}`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book deleted successfully');
        done();
      });
  });
});
