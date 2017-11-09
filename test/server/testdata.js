import randomstring from 'just.randomstring';
import dotenv from 'dotenv';

dotenv.config();
// Test data for user routes
export const username = randomstring().substring(0, 8);
export const testUsername = 'username';
export const email = `${username}@email.com`;
export const password = 'password';

// Test data for book addition, edit and get functions
export const name = randomstring().substring(0, 8);
export const author = randomstring().substring(0, 8);
export const description = 'A prose work of the 20th century';
export const categoryId = 2;
export const quantity = 2;
export const image = 'image.png';

// Test data for book borrow and return processes
export const bookId = 1;
export const userId = 1;
export const deleteUserId = 2;

export const bookIdFinished = 1;
export const bookIdUnborrowed = 80;
