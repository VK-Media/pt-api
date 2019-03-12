
# Personal Trainer API

*The Offical API for VK Medias Personal Trainer apps*
Below you can find endpoints of the API

## Endpoints
### User

```
GET /user
```

Response
```
[
    {
        "_id": "5c854ff67b167c4604966e54",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@doe.com",
        "password": "$2b$10$MDklFRS9vP8f58cV3BXGcOKTAOTr74LVvFFMYgdssl0RCJVB62D5e",
        "created_date": "2019-03-10T17:57:10.901Z",
        "__v": 0
    },
    {...}
]
```
---
```
POST /user
```

##### Parameters

| **Name** | **Type** | **Description** |
| ---------- | ------- | --------------- |
| firstName | `String` | The first name of the user |
| lastName | `String` | The last name of the user |
| email | `String` | **Required**, **Unique**. The email of the user |
| password | `String` | **Required**. The password of the user |

Example
```
{
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@doe.com',
	password: '1234'
}
```

Response
```
{
    "_id": "5c854ff67b167c4604966e54",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com",
    "password": "$2b$10$MDklFRS9vP8f58cV3BXGcOKTAOTr74LVvFFMYgdssl0RCJVB62D5e",
    "created_date": "2019-03-10T17:57:10.901Z",
    "__v": 0
}
```
---
```
GET /user/:userId
```
Example
```
/user/5c854ff67b167c4604966e54
```

Response
```
{
    "_id": "5c854ff67b167c4604966e54",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com",
    "password": "$2b$10$MDklFRS9vP8f58cV3BXGcOKTAOTr74LVvFFMYgdssl0RCJVB62D5e",
    "created_date": "2019-03-10T17:57:10.901Z",
    "__v": 0
}
```
---
```
PUT /user/:userId
```

##### Parameters
| **Name** | **Type** | **Description** |
| ---------- | ------- | --------------- |
| firstName | `String` | The first name of the user |
| lastName | `String` | The last name of the user |
| email | `String` | The email of the user |

Example
```
/user/5c854ff67b167c4604966e54

{
	firstName: 'Jane',
	email: 'jane@doe.com'
}
```

Response
```
{
    "_id": "5c854ff67b167c4604966e54",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@doe.com",
    "password": "$2b$10$MDklFRS9vP8f58cV3BXGcOKTAOTr74LVvFFMYgdssl0RCJVB62D5e",
    "created_date": "2019-03-10T17:57:10.901Z",
    "__v": 0
}
```
---
```
DELETE /user/:userId
```
Example
```
/user/5c854ff67b167c4604966e54
```
Response
```
{
    "status": "success",
    "message": "The user has been deleted!"
}
```
---
```
/user/authenticate
```
##### Parameters

| **Name** | **Type** | **Description** |
| ---------- | ------- | --------------- |
| email | `String` | **Required**. The email of the user to be authenticated |
| password | `String` | **Required**. The password of the user to be authenticated |

Example
```
{
	email: 'jane2doe.com',
	password: '1234'
}
```
Response
```
{
    "status": "success",
    "message": "User authenticated"
}
```