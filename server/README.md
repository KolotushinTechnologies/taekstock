# Requests

## Attention:

* Make sure that the Base already has all types of prices for Data for payment to Users! If there are no types and prices in the User Base, then the User's balance is not replenished during registration!

To create types and prices for user data, go to the admin README.md file.
/src/resources/admin/README.md

## DevOps

* On the Server, you need to create a shared folder in the /src directory.

## Nginx Config

```nginx
server {
        listen 80;
        server_name 159.253.23.32;

        #react app & front-end files

        location / {
                root /var/www/html/cstore/Frontend/build;
                index index.html;
                try_files $uri /index.html;
        }

        # node api reverse proxy

        location /api/ {
             proxy_pass http://159.253.23.32:5000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
       }
}
```

### Example:

/src/public/files/images/attachments

### Register
POST http://localhost:5000/api/users/register

request:

*fullname: required
*email: required
*password: required
phoneNumber: optional
country: optional

```json
{
    "fullname": "Full Name",
    "email": "email@gmail.com",
    "password": "123456789"
}
```

or

```json
{
    "fullname": "Full Name",
    "email": "email@gmail.com",
    "password": "123456789",
    "phoneNumber": "123456789",
    "country": "Country"
}
```

response: 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODY0Zjg3ZTBlZTQ2ZTRiYmMyNTRlMiIsImlhdCI6MTY2OTc0NjU2NywiZXhwIjoxNjY5ODMyOTY3fQ.UkBMcOZlnEpZeq4ZlLMxYtjcPhuzmCLahfrWz-weX6Y"
}
```

### Login
POST http://localhost:5000/api/users/login

request:

*email: required
*password: required

```json
{
    "email": "email@gmail.com",
    "password": "123456789"
}
```

response:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODY0Zjg3ZTBlZTQ2ZTRiYmMyNTRlMiIsImlhdCI6MTY2OTc0NzI5MSwiZXhwIjoxNjY5ODMzNjkxfQ.pRfnpK00qvvhsVh715TT8HNXsLfgjYkqiAr44YI0urE"
}
```

### Login Admin
POST http://localhost:5000/api/users/login-admin

request:

*email: required
*password: required

```json
{
    "email": "email@gmail.com",
    "password": "123456789"
}
```

response:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODY0Zjg3ZTBlZTQ2ZTRiYmMyNTRlMiIsImlhdCI6MTY2OTc0NzI5MSwiZXhwIjoxNjY5ODMzNjkxfQ.pRfnpK00qvvhsVh715TT8HNXsLfgjYkqiAr44YI0urE"
}
```

### Forgot Password
POST http://localhost:5000/api/users/forgot-password

request:

*email: required

```json
{
    "email": "email@gmail.com"
}
```

response:

```json
"Please, check the Email! MProject has sent you a verification code!"
```

### Change Password
POST http://localhost:5000/api/users/change-password

request:

*email: required
*secretCode: required
*newPassword: required

```json
{
    "email": "email@gmail.com",
    "secretCode": 1234,
    "newPassword": "newPassword"
}
```

response:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODY0Zjg3ZTBlZTQ2ZTRiYmMyNTRlMiIsImlhdCI6MTY2OTc0NzI5MSwiZXhwIjoxNjY5ODMzNjkxfQ.pRfnpK00qvvhsVh715TT8HNXsLfgjYkqiAr44YI0urE"
}
```

### Change Password For Profile
PUT http://localhost:5000/api/users/change-password-profile

request:

*newPassword: required
*confirmNewPassword: required

*user = Headers.Authorization

*Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4ZDcyYjkzOTZjZjJiMDBkY2ZjZDJhIiwicm9sZXMiOlsiVVNFUiJdfSwiaWF0IjoxNjcwMjE0MzMwLCJleHAiOjE2NzAzMDA3MzB9.DWBS8oXge5CjO4tgoj7MlzCvDNsLJvavUffE2gILBug 

```json
{
    "newPassword": "123456789",
    "confirmNewPassword": "123456789",
}
```

response:

```json
{
    "user": "user"
}
```
