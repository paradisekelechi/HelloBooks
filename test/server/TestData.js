import randomstring from 'just.randomstring';
import dotenv from 'dotenv';

dotenv.config();

const randomText = randomstring().substring(0, 8);

// Test data for user routes
export const username = randomText;
export const testUsername = 'username';
export const email = `${username}@email.com`;
export const password = 'password';

// Test data for book addition, edit and get functions
export const name = randomText;
export const author = randomText;
export const description = 'A prose work of the 20th century';
export const categoryId = 2;
export const quantity = 2;
export const image = 'image.png';

// Test data for book borrow and return processes
export const bookId = 9;
export const userId = 9;
export const deleteUserId = 2;

export const bookIdFinished = 1;
export const bookIdUnborrowed = 80;

// Test data for book category
export const categoryName = randomText;
export const abbreviation = randomstring().substring(0, 2);
export const categoryDescription = randomText;

// Test data for usertype
export const userTypeName = randomText;
export const userTypeDescription = randomText;
export const userTypeLevel = Math.floor(Math.random() * 10000);

// Test data for accounttype
export const accountTypeName = randomText;
export const accountTypeDescription = randomText;
export const accountTypeLevel = Math.floor(Math.random() * 10000);
