/**
 *  @fileOverview Controller index file that manages and exports all the controllers
 *
 *  @author Paradise Kelechi
 *
 * @requires ./User
 * @requires ./Book
 * @requires ./BorrowLog
 * @requires ./Category
 * @requires ./UserType
 * @requires ./AccountType
 */

import user from './User';
import book from './Book';
import borrowlog from './BorrowLog';
import bookcategory from './Category';
import usertype from './UserType';
import accounttype from './AccountType';
import authentication from './Authentication';

/**
 * Export all the controllers in this folder
 */
export default {
  user,
  book,
  borrowlog,
  usertype,
  accounttype,
  bookcategory,
  authentication
};
