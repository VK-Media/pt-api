# Personal Trainer API
*The Offical API for VK Medias Personal Trainer apps*

Below you can find the current endpoints of the API in the following format:\
```HTTP_METHOD "URL" - Description of endpoint```

### Current endpoints

#### User

GET "/user" - returns all users\
POST "/user" - creates a new user\
GET "user/:userId" - returns one user with given id\
PUT "user/:userId" - updates one user with given id\
DELETE "user/:userId" - deletes one user with given id

### Current models

#### User

A User has the following properties:

* firstName
* lastName
* email
* password

