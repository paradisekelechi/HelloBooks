[![Build Status](https://travis-ci.org/paradisekelechi/HelloBooks.svg?branch=chore%2F152720529%2Fhost-application)](https://travis-ci.org/paradisekelechi/HelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/paradiskelechi/HelloBooks/badge.svg?branch=development)](https://coveralls.io/github/paradiskelechi/HelloBooks?branch=development)
# HelloBooks

HelloBooks is an online book library and management application. Hello Books is aimed at handling the individual processes that take place in the library, from the borrowing of books to the return of books. This in turn handles inventory management of the book stock in the library effectively. 


## Getting Started

These instructions will get you a copy of the HelloBook application up and running on your local machine for development and testing purposes. See installation for notes on how to deploy the project on a live system.

### Prerequisites

The following applications are required to have HelloBooks up and running on your system.

```
Node 6+ – (Version 6 and above)
```
```
Editor – Sublime Text, Visual Studio Code or others
```
```
Postman for routes and API testing
```
```
Postgres database manager – PgAdmin, Elephant SQL
```


### Installing

Take the following steps to get a development environment of HelloBooks application running on you machine or server 

Clone HelloBooks application 

On the root folder of the cloned application, add a .env file with required credentials following the .sample-env file pattern. This should contain the following 

```
DB_NAME=''
DB_USERNAME=''
DB_PASSWORD=''
DB_URL=''
SECRET='';
```
Navigate to the root folder of the application
On command line, run the following commands
```javascript
npm install
npm initialize:db
npm run start
```
Test the individual routes using postman
End with an example of getting some data out of the system or using it for a little demo

## Running the tests

In order to run tests cases for the routes, execute the following command
```javascript
npm run test
```

## Built With

* Node js – A JavaScript runtime built on Chrome's V8 JavaScript engine (https://nodejs.org/en/)
* Express Js – Fast, minimalistic web framework for Node.js (https://expressjs.com)
* Sequelize – A promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL. (http://docs.sequelizejs.com)
* Postgresql – An open source database (https://www.postgresql.org/)

## Authors

* **Kelechi Iheanyichukwu** - (https://github.com/paradiskelechi)

## Acknowledgments

* Great thanks and appreciation to Murphy Edaho, Andela Bootcamp learning facilitator
* Much appreciation to Daniel Chuks, Andela Bootcamp learning facilitator



