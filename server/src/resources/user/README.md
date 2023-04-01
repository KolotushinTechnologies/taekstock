# Requests For Users API's

### Registration Users
POST http://localhost:5000/api/users/register

request:

*firstname: required
*lastname: optional
*phoneNumber: optional
*email: required
*password: required

*user = Headers.Authorization

```json
{
    "firstname": "Donald",
    "lastname": "Donaldson",
    "phoneNumber": "+09737183774542",
    "email": "donald@gmail.com",
    "password": "donaldcool",
}
```

response: 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTdkNzE0ZmVlMTFkZTYzYzIzZjAxIiwicm9sZXMiOlsiVXNlciJdfSwiaWF0IjoxNjc3NjIyNjQxLCJleHAiOjE2Nzc3MDkwNDF9.EG5n_2m5ChMX1CABG7lPPizux3ob0hQjxZmnIkizRVc"
}
```

### Login Users
POST http://localhost:5000/api/users/login

request:

*email: required
*password: required

*user = Headers.Authorization

```json
{
    "email": "donald@gmail.com",
    "password": "donaldcool",
}
```

response: 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmZTdkNzE0ZmVlMTFkZTYzYzIzZjAxIiwicm9sZXMiOlsiVXNlciJdfSwiaWF0IjoxNjc3NjIyNzEyLCJleHAiOjE2Nzc3MDkxMTJ9.ZmYHsntUwheUyM3qNVHJ8map111VJH2LAhA8yiLI3a8"
}
```

### Update My Profile (For Authorized User)
PUT http://localhost:5000/api/users/update-my-profile

request:

*firstname: required
*lastname: optional
*phoneNumber: optional
*email: required

*user = Headers.Authorization

```json
{
    "firstname": "New Donald111",
    "lastname": "Donaldson",
    "phoneNumber": "+928377133133233",
    "email": "donald@gmail.com",
}
```

response: 

```json
{
    "_id": "63fe7d714fee11de63c23f01",
    "firstname": "New Donald111",
    "lastname": "Donaldson",
    "phoneNumber": "+928377133133233",
    "email": "donald@gmail.com",
    "roles": [
        "User"
    ],
    "createdAt": "2023-02-28T22:17:21.161Z",
    "updatedAt": "2023-02-28T22:26:35.440Z",
    "__v": 0
}
```

### Get User Data (For Authorized User)
GET http://localhost:5000/api/users

request:

*user = Headers.Authorization

response: 

```json
{
    "data": {
        "_id": "63fe7d714fee11de63c23f01",
        "firstname": "New Donald111",
        "lastname": "Donaldson",
        "phoneNumber": "+928377133133233",
        "email": "donald@gmail.com",
        "roles": [
            "User"
        ],
        "createdAt": "2023-02-28T22:17:21.161Z",
        "updatedAt": "2023-02-28T22:26:35.440Z",
        "__v": 0
    }
}
```
