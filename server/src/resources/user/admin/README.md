# Requests For Users API's For Admins 

### Get all users
GET http://localhost:5000/api/admin/users/all

response: 

```json
[
    {
        "_id": "63d77404e7e361abcc402be9",
        "fullname": "John Smith",
        "email": "smith@gmail.com",
        "phoneNumber": "+198378288749",
        "country": "USA",
        "roles": [
            "USER",
            "SuperAdmin"
        ],
        "createdAt": "2023-01-30T07:38:44.072Z",
        "updatedAt": "2023-01-30T07:38:44.072Z",
        "__v": 0
    },
    {
        "_id": "63f34fe04b801f3efc237be7",
        "firstname": "DonaldUpdate312",
        "lastname": "DonaldsonUpdate723",
        "phoneNumber": "+09737183732828999",
        "email": "donaldupdate12345@gmail.com",
        "roles": [
            "USER"
        ],
        "createdAt": "2023-02-20T10:48:00.880Z",
        "updatedAt": "2023-02-20T14:06:41.767Z",
        "__v": 0
    }
]
```

### Get user by ID
GET http://localhost:5000/api/admin/users/:user_id

request:

params:

*user_id: required

http://localhost:5000/api/admin/users/63d77404e7e361abcc402be9

response: 

```json
{
    "_id": "63f34fe04b801f3efc237be7",
    "firstname": "DonaldUpdate312",
    "lastname": "DonaldsonUpdate723",
    "phoneNumber": "+09737183732828999",
    "email": "donaldupdate12345@gmail.com",
    "roles": [
        "USER"
    ],
    "createdAt": "2023-02-20T10:48:00.880Z",
    "updatedAt": "2023-02-20T14:06:41.767Z",
    "__v": 0
}
```

### Search Users
POST http://localhost:5000/api/admin/users/searching/all

request:

```json
{
    "content": "don"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "63f34fe04b801f3efc237be7",
        "firstname": "DonaldUpdate",
        "lastname": "DonaldsonUpdate",
        "phoneNumber": "+09737183732828",
        "email": "donaldupdate@gmail.com",
        "roles": [
            "USER"
        ],
        "createdAt": "2023-02-20T10:48:00.880Z",
        "updatedAt": "2023-02-20T13:56:21.575Z",
        "__v": 0
    }
]
```

### Update Information For user by ID
PUT http://localhost:5000/api/admin/users/update/:user_id

request:

*firstname: required
*lastname: optional
*phoneNumber: optional
*email: required

*user = Headers.Authorization

params:

*user_id: required

http://localhost:5000/api/admin/users/update/63f34fe04b801f3efc237be7

```json
{
    "firstname": "DonaldUpdate312",
    "lastname": "DonaldsonUpdate723",
    "phoneNumber": "+09737183732828999",
    "email": "donaldupdate12345@gmail.com",
}
```

response: 

```json
{
    "_id": "63f34fe04b801f3efc237be7",
    "firstname": "DonaldUpdate312",
    "lastname": "DonaldsonUpdate723",
    "phoneNumber": "+09737183732828999",
    "email": "donaldupdate12345@gmail.com",
    "roles": [
        "USER"
    ],
    "createdAt": "2023-02-20T10:48:00.880Z",
    "updatedAt": "2023-02-20T14:06:41.767Z",
    "__v": 0
}
```

### Delete user by ID
DELETE http://localhost:5000/api/admin/users/:user_id

request:

*user = Headers.Authorization

params:

*user_id: required

http://localhost:5000/api/admin/users/63f34fe04b801f3efc237be7

response: 

```json
"User with 63f34fe04b801f3efc237be7 Deleted"
``` 