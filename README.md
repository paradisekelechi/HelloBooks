[![Build Status](https://travis-ci.org/paradisekelechi/HelloBooks.svg?branch=development)](https://travis-ci.org/paradisekelechi/HelloBooks)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9fc290d018cbb3c1041c/test_coverage)](https://codeclimate.com/github/paradisekelechi/HelloBooks/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/9fc290d018cbb3c1041c/maintainability)](https://codeclimate.com/github/paradisekelechi/HelloBooks/maintainability)
# HelloBooks

HelloBooks is an online book library and management application. Hello Books is aimed at handling the individual processes that take place in the library, from the borrowing of books to the returning of books. This in turn handles inventory management of the book stock in the library effectively.
The application is hosted at [http://hellobooks-kelechi.herokuapp.com/signin](http://hellobooks-kelechi.herokuapp.com/signin)

## Application Features

The Application Programming Interface(API) and fully hosted application implements the following features for diferent users correspondingly.

##### Unauthenticated Users
- View the landing page
- View the about page
- View all available books in the application
- Register in the application
- Sign into the application

##### Authenticated Users
- View all available books in the application
- Borrow a book
- Return a borrowed book
- View user profile
- Log out of the application

##### Admin Users
- View all the books in the application
- View details of a book
- View user profile
- Delete a book
- View application settings (user types, account types and book categories)
- Add book category
- Add a book

## Built With

* [Node js – A JavaScript runtime built on Chrome's V8 JavaScript engine ](https://nodejs.org/en/)
* [Express Js – Fast, minimalistic web framework for Node.js ](https://expressjs.com)
* [Sequelize – A promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL. ](http://docs.sequelizejs.com)
* [Postgresql – An open source database ](https://www.postgresql.org/)

## API Documentation

The application server-side API documentation can be found in [https://hellobooks2.docs.apiary.io](https://hellobooks2.docs.apiary.io)

## Getting Started

These instructions will get you a copy of the HelloBook application up and running on your local machine for development and testing purposes. See installation for notes on how to deploy the project on a live system.

### Prerequisites

The following applications are required to have HelloBooks up and running on your system.

```
Node 5+ – (Version 5 and above)
```
```
Editor – Sublime Text, Visual Studio Code or others
```
```
Postgres database manager – PgAdmin, Elephant SQL
```

### Installing the application

Take the following steps to get a development environment of HelloBooks application running on you machine or server

Clone HelloBooks application

On the root folder of the cloned application, add a .env file with required credentials following the .sample-env file pattern. This should contain the following

```
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_URL=
SECRET=
BORROW_VALIDITY_IN_DAYS=
SILVER_ACCOUNT_USE_COUNT=
GOLD_ACCOUNT_USE_COUNT=
PLATINIUM_ACCOUNT_USE_COUNT=
ADMIN_EMAIL_ACCOUNT=
ADMIN_EMAIL_PASSWORD=
ADMINTOKEN=
USERTOKEN=
ADMIN_USERNAME=
ADMIN_PASSWORD=
CLIENT_USERNAME=
CLIENT_PASSWORD=
NODE_ENV=
PORT=

```
Navigate to the root folder of the application
On command line, run the following commands
```javascript
npm install
npm run start
```
Test the individual routes using postman
End with an example of getting some data out of the system or using it for a little demo

### Running the application tests

In order to run tests cases for the routes, execute the following command
- Server side test
```javascript
npm run test
```

- Client side test
```javascript
npm run test:client
```

- End to end test
```javascript
npm run e2e-server
npm run e2e-test
```

## Contributing

In order to contribute to the project, kindly do the following
- Fork the repository
- Work on the feature you desire
- Ensure that you follow the convention as outlined in the [wiki](https://github.com/paradisekelechi/HelloBooks/wiki)
- Raise a pull request to the repository

We welcome and deeply appreciate your contributions.
## Authors

* **Kelechi Iheanyichukwu** - (https://github.com/paradisekelechi)
