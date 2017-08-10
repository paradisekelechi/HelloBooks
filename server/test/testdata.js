import randomstring from 'just.randomstring';


//Test data for user signin and signup
export const username = randomstring().substring(0, 8);
export const email = username+'@'+'email.com';
export const password = 'password';

export const signinUsername = 'goodness';
export const signinPassword = 'goodness';
export const token = '';

//Test data for book borrow and return processes
export const bookId = 34;
export const userId = 1;

export const bookIdFinished = 1 ;
export const bookIdUnborrowed = 3;

//Test data for book addition, edit and get functions
export const bookName = randomstring().substring(0, 8);
export const bookAuthor = randomstring().substring(0, 8);
export const bookDescription = 'A prose work of the 20th century';
export const bookCategoryId = 2;
export const bookQuantity = 2;
export const bookImage = 'image.png';