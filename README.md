# Personal Trainer API
*The Offical API for VK Medias Personal Trainer apps*

Below you can find endpoints of the API in the following format:\
```HTTP_METHOD "URL" - Description of endpoint```

As well as the properties of each model in the following format:\
* property
    * property configuration
    * ...

### Endpoints
#### User
**GET** "/user" - returns all users\
**POST** "/user" - creates a new user\
**GET** "user/:userId" - returns one user with given id\
**PUT** "user/:userId" - updates one user with given id\
**DELETE** "user/:userId" - deletes one user with given id\
**POST** "user/authenticate" - authenticates the user on the server

### Models
#### User
A User has the following properties:
* firstName
    * String
* lastName
    * String
* email
    * String
    * Required
    * Unique
* password
    * String
    * Required

