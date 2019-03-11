# Personal Trainer API
*The Offical API for VK Medias Personal Trainer apps*

### Current endpoints
#### User
GET "/user" - returns all users\
POST "/user" - creates a new user\
GET "user/:userId" - returns one user with given id\
PUT "user/:userId" - updates one user with given id\
DELETE "user/:userId" - deletes one user with given id

### Current models
#### User
    + firstName
        + String
    + lastName
        + String
    + email
        + String
        + Required
    + password
        + String
        + Required
