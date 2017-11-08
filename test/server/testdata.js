import randomstring from 'just.randomstring';
import dotenv from 'dotenv';

dotenv.config();
// Test data for user routes
export const username = randomstring().substring(0, 8);
export const testUsername = 'username';
export const email = `${username}@` + 'email.com';

// Test data for book addition, edit and get functions
export const bookName = randomstring().substring(0, 8);
export const bookAuthor = randomstring().substring(0, 8);
export const bookDescription = 'A prose work of the 20th century';
export const bookCategoryId = 2;
export const bookQuantity = 2;
export const bookImage = 'image.png';

// Test data for book borrow and return processes
export const bookId = 1;
export const userId = 1;
export const deleteUserId = 2;

export const bookIdFinished = 1;
export const bookIdUnborrowed = 80;
