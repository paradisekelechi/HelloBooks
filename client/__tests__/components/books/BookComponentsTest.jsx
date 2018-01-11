import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import BookIterator from '../../../components/books/borrow/BookIterator';

describe('Book Components - Borrow - BookIterator ', () => {
  const props = {
    bookList: [{
      id: 1,
      name: 'book 1',
      author: 'author 1',
      description: 'description of book 1',
      cover: 'cover-image.png'
    }],
    loggedIn: true,
    userdata: { name: 'paradise' }
  };
  const setup = () => {
    return shallow(<BookIterator {...props} />);
  };
  const wrapper = setup();
  it('renders BookIterator component', () => {
    expect(wrapper.find('h5'));
    expect(wrapper.find('BookCard'));
  });
});
