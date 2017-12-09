FORMAT: 1A
HOST: https://hellobooks-kelechi.herokuapp.com

# Hellobooks

Hellobooks is an online book library application for borrowing books and managing library processes. It is a platform
for users to borrow books and read books.

## Signup Route [/api/v1/users/signup]

### Signup [POST]

Enter your credentials to signup or register into the application

+ Request (application/json)

        {
            "username": "my user",
            "email": "myuser@gmail.com",
            "password": "myuser"
        }

+ Response 200 (application/json)

    + Body

            {
                "message": "User Account Creation Successful",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQyLCJlbWFpbCI6Im15dXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im15IHVzZXIiLCJ1c2VydHlwZSI6MSwiYWNjb3VudF90eXBlIjoxLCJpbWFnZSI6bnVsbCwiaWF0IjoxNTEyODI5MTgyLCJleHAiOjE1MTYyODUxODJ9.9rDq3_xJgntzVeDM81t4iTiqGHI6PwmgnxEsmfIFYCE",
                "success": true,
                "email": "myuser@gmail.com",
                "userid": 42,
                "username": "my user",
                "usertype": 1,
                "account_type": 1
            }

## Signin Route [/api/v1/users/signin]

### Signin [POST]

As an already registered user, enter your credentials to signin to the application

+ Request (application/json)

        {
            "username": "my user",
            "password": "myuser"
        }

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "User successfully signed in ",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQyLCJlbWFpbCI6Im15dXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im15IHVzZXIiLCJ1c2VydHlwZSI6MSwiYWNjb3VudHR5cGUiOjEsImltYWdlIjpudWxsLCJpYXQiOjE1MTI4MjkyNzUsImV4cCI6MTM5NTQ0MjkyNzV9.jhzMau3aS2tSWuoH-Qnt-NZnhMDLRKqAqdKQPXfAX8Y",
                "usertype": 1,
                "username": "my user",
                "email": "myuser@gmail.com",
                "accounttype": 1
            }

## Users Routes [/api/v1/users/]

### Get Users [GET]

As an admin user of the application, get all the users of the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Users list successfully gotten ",
                "users": {
                    "count": 3,
                    "rows": [
                        {
                            "id": 22,
                            "username": "kelegff",
                            "email": "ggdd@asww.com",
                            "password": "$2a$10$NRmtXHOe6TRTkASDIjVSteIYgITO169Po.Ze7UZyjvslmut3IxVJ2",
                            "image": null,
                            "use_count": 0,
                            "active": true,
                            "deleted": false,
                            "createdAt": "2017-11-12T22:12:16.523Z",
                            "updatedAt": "2017-11-12T22:12:16.523Z",
                            "user_type_id": 1,
                            "account_type_id": 1
                        }
                    ]
                }
            }

## Deleted Users Route [/api/v1/users/{?deleted}]

### Deleted Users [GET]

As an admin user of the application, get all the deleted users of the application

+ Request (application/json)
    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w


+ Response 201 (application/json)

    + Headers

            Location: /users

    + Body

            {
                "success": true,
                "message": "Users list successfully gotten ",
                "users": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 22,
                            "username": "kelegff",
                            "email": "ggdd@asww.com",
                            "password": "$2a$10$NRmtXHOe6TRTkASDIjVSteIYgITO169Po.Ze7UZyjvslmut3IxVJ2",
                            "image": null,
                            "use_count": 0,
                            "active": true,
                            "deleted": false,
                            "createdAt": "2017-11-12T22:12:16.523Z",
                            "updatedAt": "2017-11-12T22:12:16.523Z",
                            "user_type_id": 1,
                            "account_type_id": 1
                        }
                    ]
                }
            }

## Admin Users Route [/api/v1/users/{?admin}]

### Admin Users [GET]

As an admin user of the application, get all the admin users of the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 201 (application/json)

    + Body

            {
                "success": true,
                "message": "Users list successfully gotten ",
                "users": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 22,
                            "username": "kelegff",
                            "email": "ggdd@asww.com",
                            "password": "$2a$10$NRmtXHOe6TRTkASDIjVSteIYgITO169Po.Ze7UZyjvslmut3IxVJ2",
                            "image": null,
                            "use_count": 0,
                            "active": true,
                            "deleted": false,
                            "createdAt": "2017-11-12T22:12:16.523Z",
                            "updatedAt": "2017-11-12T22:12:16.523Z",
                            "user_type_id": 1,
                            "account_type_id": 1
                        }
                    ]
                }
            }

## Client Users Route [/api/v1/users/{?client}]

### Client Users [GET]

As an admin user of the application, get all the client users of the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 201 (application/json)

    + Body

            {
                "success": true,
                "message": "Users list successfully gotten ",
                "users": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 22,
                            "username": "kelegff",
                            "email": "ggdd@asww.com",
                            "password": "$2a$10$NRmtXHOe6TRTkASDIjVSteIYgITO169Po.Ze7UZyjvslmut3IxVJ2",
                            "image": null,
                            "use_count": 0,
                            "active": true,
                            "deleted": false,
                            "createdAt": "2017-11-12T22:12:16.523Z",
                            "updatedAt": "2017-11-12T22:12:16.523Z",
                            "user_type_id": 1,
                            "account_type_id": 1
                        }
                    ]
                }
            }

## Book Routes [/api/v1/books/]

### Add Book [POST]

As an admin user of the application, add a book to the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

    + Body

            {
                "name": "test book",
                "author": "Test Author",
                "quantity": 5,
                "categoryId": 2
            }

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Book successfully added",
                "book": {
                    "id": 8,
                    "name": "test book",
                    "description": "undefined",
                    "author": "Test Author",
                    "quantity": 6,
                    "cover": "undefined",
                    "borrowed": false,
                    "deleted": false,
                    "category_id": 2,
                    "updatedAt": "2017-12-09T14:39:53.761Z",
                    "createdAt": "2017-12-09T14:39:53.761Z"
                }
            }

### Get Books [GET]

As a user of the application, get all books in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w


+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Books obtained successfully",
                "book": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 24,
                            "name": "czAzIno4",
                            "author": "YNio5TO5",
                            "description": "A prose work of the 20th century",
                            "cover": "undefined",
                            "quantity": 2,
                            "borrowed": false,
                            "deleted": false,
                            "createdAt": "2017-08-26T07:01:33.126Z",
                            "updatedAt": "2017-08-26T07:01:33.126Z",
                            "category_id": 2
                        }
                    ]
                }
            }

## Finished Books [/api/v1/books/{?finished}]

### Get Finished Books [GET]

As an admin user of the application, get all finished books in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w


+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Books obtained successfully",
                "book": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 24,
                            "name": "czAzIno4",
                            "author": "YNio5TO5",
                            "description": "A prose work of the 20th century",
                            "cover": "undefined",
                            "quantity": 2,
                            "borrowed": false,
                            "deleted": false,
                            "createdAt": "2017-08-26T07:01:33.126Z",
                            "updatedAt": "2017-08-26T07:01:33.126Z",
                            "category_id": 2
                        }
                    ]
                }
            }

## Available Books [/api/v1/books/{?available}]

### Get Available Books [GET]

As an admin user of the application, get all available books in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Books obtained successfully",
                "book": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 24,
                            "name": "czAzIno4",
                            "author": "YNio5TO5",
                            "description": "A prose work of the 20th century",
                            "cover": "undefined",
                            "quantity": 2,
                            "borrowed": false,
                            "deleted": false,
                            "createdAt": "2017-08-26T07:01:33.126Z",
                            "updatedAt": "2017-08-26T07:01:33.126Z",
                            "category_id": 2
                        }
                    ]
                }
            }


## Deleted Books [/api/v1/books/{?deleted}]

### Get Deleted Books [GET]

As an admin user of the application, get all deleted books in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Books obtained successfully",
                "book": {
                    "count": 1,
                    "rows": [
                        {
                            "id": 24,
                            "name": "czAzIno4",
                            "author": "YNio5TO5",
                            "description": "A prose work of the 20th century",
                            "cover": "undefined",
                            "quantity": 2,
                            "borrowed": false,
                            "deleted": false,
                            "createdAt": "2017-08-26T07:01:33.126Z",
                            "updatedAt": "2017-08-26T07:01:33.126Z",
                            "category_id": 2
                        }
                    ]
                }
            }

## Borrow Routes [/api/v1/users/{userId}/books/]

+ Parameters
    + userId (number) - ID of the user


### Borrow Book [POST]

As a user of the application, borrow an available book in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w
    + Body

            {
                "bookId": 6
            }

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Book borrowed successfully"
            }

### Return Book [PUT]

As a user of the application, return a book you borrowed

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w
    + Body

            {
                "bookId": 6
            }

+ Response 200 (application/json)

   + Body

            {
                "success": true,
                "message": "Book returned successfully"
            }

### Get Borrowed Books [GET]

As a user of the application, get books borrowed pending return

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "You have borrowed some books!",
                "booklog": [
                    {
                        "id": 1,
                        "borrow_date": "2017-12-09T14:47:56.703Z",
                        "return_date": "2017-12-09T14:54:02.999Z",
                        "returned": true,
                        "deleted": false,
                        "createdAt": "2017-12-09T14:47:56.763Z",
                        "updatedAt": "2017-12-09T14:54:03.065Z",
                        "user_id": 5,
                        "book_id": 8,
                        "User": {
                            "id": 5,
                            "username": "emison",
                            "email": "emisonbanks@yahoo.com",
                            "password": "$2a$10$42bod1X.0JdzttXpRM0tOufNkdov/qHp4z.DH2eqaIQjLlPNWmwX2",
                            "image": null,
                            "use_count": 1,
                            "active": true,
                            "deleted": false,
                            "createdAt": "2017-11-11T17:50:11.320Z",
                            "updatedAt": "2017-12-09T14:54:03.129Z",
                            "user_type_id": 1,
                            "account_type_id": 1
                        },
                        "Book": {
                            "id": 8,
                            "name": "test book",
                            "author": "Test Author",
                            "description": "undefined",
                            "cover": "undefined",
                            "quantity": 6,
                            "borrowed": false,
                            "deleted": false,
                            "createdAt": "2017-12-09T14:39:53.761Z",
                            "updatedAt": "2017-12-09T14:54:03.098Z",
                            "category_id": 2
                        }
                    }
                ]
            }

## Book Category Routes [/api/v1/categories/]

### Add Book Category [POST]

As an admin user of the application, add a book category to the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

    + Body

            {
                "name": "ANONYMOUS",
                "description": "Books that are anonymous",
                "abbreviation": "ANO",
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "Book category added",
                "success": true
            }

### Get Book Categories [GET]

As a user of the application, get all books in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Book category successfully gotten",
                "bookcategory": [
                    {
                        "id": 1,
                        "name": "OTHERS",
                        "abbreviation": "OTH",
                        "description": "Other unclassified books",
                        "deleted": false,
                        "createdAt": "2017-11-09T13:06:08.463Z",
                        "updatedAt": "2017-11-09T13:06:08.463Z"
                    },
                    {
                        "id": 2,
                        "name": "NOVEL",
                        "abbreviation": "NOV",
                        "description": "Novels and prose works",
                        "deleted": false,
                        "createdAt": "2017-11-09T13:06:08.467Z",
                        "updatedAt": "2017-11-09T13:06:08.467Z"
                    },
                    {
                        "id": 3,
                        "name": "DOCUMENTARIES",
                        "abbreviation": "DOC",
                        "description": "Documentaries and articles",
                        "deleted": false,
                        "createdAt": "2017-11-09T13:06:08.470Z",
                        "updatedAt": "2017-11-09T13:06:08.470Z"
                    }
                ]
            }

## User Type [/api/v1/usertypes/]

### Add Usertype [POST]

As an admin user of the application, add a usertype to the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

    + Body

            {
                "name": "ANONYMOUS",
                "description": "Anonymous usertype",
                "level": 4
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "Usertype added successfully",
                "success": true
            }

### Get User Types [GET]

As an admin user of the application, get all usertypes in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w


+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Usertypes gotten successfully",
                "usertype": [
                    {
                        "id": 1,
                        "name": "USER",
                        "description": "A basic user of the application",
                        "level": 1,
                        "deleted": false,
                        "createdAt": "2017-11-09T11:35:44.531Z",
                        "updatedAt": "2017-11-09T11:35:44.531Z"
                    },
                    {
                        "id": 2,
                        "name": "ADMIN",
                        "description": "Admin user of the application",
                        "level": 2,
                        "deleted": false,
                        "createdAt": "2017-11-09T11:35:44.560Z",
                        "updatedAt": "2017-11-09T11:35:44.560Z"
                    },
                    {
                        "id": 5,
                        "name": "ANONYMOUS",
                        "description": "Books that are anonymous",
                        "level": 9,
                        "deleted": false,
                        "createdAt": "2017-12-09T15:17:34.687Z",
                        "updatedAt": "2017-12-09T15:17:34.687Z"
                    }
                ]
            }


## Account Type [/api/v1/accounttypes/]

### Add Account Type [POST]

As an admin user of the application, add a account type to the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

    + Body

            {
                "name": "ANONYMOUS",
                "description": "Anonymous usertype",
                "level": 4
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "Accounttype added successfully",
                "success": true
            }

### Get Account Types [GET]

As an admin user of the application, get all account types in the application

+ Request (application/json)

    + Headers

            user-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQwLCJlbWFpbCI6InBrZWxlY2hpQHNlYW1maXguY29tIiwidXNlcm5hbWUiOiJza2lwb3NraSIsInVzZXJ0eXBlIjoyLCJhY2NvdW50dHlwZSI6MSwiaW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9za2lwb3NraS9pbWFnZS91cGxvYWQvdjE1MTA5MTYyNDcvaGVsbG9ib29rcy1wcm9maWxlL1doYXRzQXBwX0ltYWdlXzIwMTctMTAtMDVfYXRfMDkuMjkuNThfdnFpN3lyLmpwZyIsImlhdCI6MTUxMDkyODU3MCwiZXhwIjoxMzk1MjUyODU3MH0.tcwVXgxRZ-sh7yM3rHpqtd9F7Orjm_s4hKmYnghBH6w

+ Response 200 (application/json)

    + Body

            {
                "success": true,
                "message": "Account types gotten",
                "accounttype": [
                    {
                        "id": 1,
                        "name": "SILVER",
                        "description": "A new user of the application",
                        "level": 1,
                        "deleted": false,
                        "createdAt": "2017-11-09T11:35:44.564Z",
                        "updatedAt": "2017-11-09T11:35:44.564Z"
                    },
                    {
                        "id": 2,
                        "name": "GOLD",
                        "description": "An advanced user of the application",
                        "level": 2,
                        "deleted": false,
                        "createdAt": "2017-11-09T11:35:44.577Z",
                        "updatedAt": "2017-11-09T11:35:44.577Z"
                    },
                    {
                        "id": 3,
                        "name": "PLATINIUM",
                        "description": "The highest user of the application with the highest priviledges",
                        "level": 3,
                        "deleted": false,
                        "createdAt": "2017-11-09T11:35:44.583Z",
                        "updatedAt": "2017-11-09T11:35:44.583Z"
                    },
                    {
                        "id": 7,
                        "name": "ANONYMOUS",
                        "description": "Books that are anonymous",
                        "level": 9,
                        "deleted": false,
                        "createdAt": "2017-12-09T15:21:06.100Z",
                        "updatedAt": "2017-12-09T15:21:06.100Z"
                    }
                ]
            }
