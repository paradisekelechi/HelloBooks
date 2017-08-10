import randomstring from 'just.randomstring';


//Test data for user signin and signup
export const username = randomstring().substring(0, 8);
export const email = username+'@'+'email.com';
export const password = 'password';

export const signinUsername = 'password';
export const signinPassword = 'password';
export const token = '';

//Test data for book borrow and return processes
export const bookId = 8;
export const userId = 1;

export const bookIdFinished = 1 ;
export const bookIdUnborrowed = 80;

//Test data for book addition, edit and get functions
export const bookName = randomstring().substring(0, 8);
export const bookAuthor = randomstring().substring(0, 8);
export const bookDescription = 'A prose work of the 20th century';
export const bookCategoryId = 2;
export const bookQuantity = 2;
export const bookImage = 'image.png';

export const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFkaXNlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicGFyYWRpc2UiLCJpYXQiOjE1MDIzODY5MDgsImV4cCI6MTUwNTg0MjkwOH0.Z40-P0rdfdJpjr6PH3UlPcZXIIJS6fO4Gj2FF6iz5RU';
export const admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbGVjaGlAZ21haWwuY29tIiwidXNlcm5hbWUiOiJrZWxlY2hpIiwiaWF0IjoxNTAyMzg3MjQxLCJleHAiOjE1MDU4NDMyNDF9._e2bNdrvSnurYCLRRIwrxYtnMW-uzsfQ1PL5azucFrc';