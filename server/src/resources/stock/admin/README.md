# Requests For Stocks For Admins

### Register a new stock
POST http://localhost:5000/api/admin/stocks/create

request:

*title: required
*description: required
*author: required
*file: optional

*user = Headers.Authorization

Form-Data Request *required
```json
{
    "title": "Title",
    "description": "Description",
    "author": "Author Name",
    *"file": "form-data",
}
```

response: 

```json
{
    "title": "Title",
    "image": "http://localhost:5000/files/images/attachments/9906d934-a7c5-4163-a74e-de701be6d46f.png",
    "description": "Description",
    "author": "Author Name",
    "_id": "64289e51999f4228ff001837",
    "createdAt": "2023-04-01T21:12:50.007Z",
    "updatedAt": "2023-04-01T21:12:50.007Z",
    "__v": 0
}
```

### Update Information For stock by ID
PUT http://localhost:5000/api/admin/stocks/update/:stock_id

request:

*title: required
*description: required
*author: required
*statusChangeFile: required
*file: optional

*user = Headers.Authorization

params:

*stock_id: required

http://localhost:5000/api/admin/stocks/update/64289eb4999f4228ff001841

Form-Data Request *required
```json
{
    "title": "Title",
    "description": "Description",
    "author": "Author Name",
    "statusChangeFile": false,
    *"file": undefined
}
```

response: 

```json
{
    "_id": "64289eb4999f4228ff001841",
    "title": "Another Title",
    "image": "",
    "description": "Another Description",
    "author": "Another Author",
    "createdAt": "2023-04-01T21:14:28.216Z",
    "updatedAt": "2023-04-01T21:21:30.872Z",
    "__v": 0
}
```

### Delete stocks by ID
DELETE http://localhost:5000/api/admin/stocks/:stock_id

request:

*user = Headers.Authorization

params:

*stock_id: required

http://localhost:5000/api/admin/stocks/64289eb4999f4228ff001841

response: 

```json
"Stock 64289eb4999f4228ff001841 Has been Deleted"
```
