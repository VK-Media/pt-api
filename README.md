# pt-api
The Offical API for VK Medias Personal Trainer apps

Current endpoints
Users:
GET "/user" - returns all users
POST "/user" - creates a new user
    - firstName
    - lastName
    - email
    - password
    
GET "user/:userId" - returns one user with given id
PUT "user/:userId" - updates one user with given id
    - firstName
    - lastName
    - email
    - password

DELETE "user/:userId" - deletes one user with given id
