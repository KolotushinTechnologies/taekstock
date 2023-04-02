# Requests For Stocks

### Get all stocks
GET http://localhost:5000/api/stocks/all

response: 

```json
[
    {
        "_id": "64289e51999f4228ff001837",
        "title": "Title",
        "image": "http://localhost:5000/files/images/attachments/9906d934-a7c5-4163-a74e-de701be6d46f.png",
        "description": "Description",
        "author": "Author Name",
        "createdAt": "2023-04-01T21:12:50.007Z",
        "updatedAt": "2023-04-01T21:12:50.007Z",
        "__v": 0
    },
    {
        "_id": "64289e83999f4228ff00183c",
        "title": "Title One",
        "description": "Description",
        "author": "Author Name",
        "createdAt": "2023-04-01T21:13:39.730Z",
        "updatedAt": "2023-04-01T21:13:39.730Z",
        "__v": 0
    }
]
```

### Get stock by ID
GET http://localhost:5000/api/stocks/:stock_id

request:

params:

*stock_id: required

http://localhost:5000/api/stocks/64289e51999f4228ff001837

response: 

```json
{
    "_id": "64289e51999f4228ff001837",
    "title": "Title",
    "image": "http://localhost:5000/files/images/attachments/9906d934-a7c5-4163-a74e-de701be6d46f.png",
    "description": "Description",
    "author": "Author Name",
    "createdAt": "2023-04-01T21:12:50.007Z",
    "updatedAt": "2023-04-01T21:12:50.007Z",
    "__v": 0
}
```

### Search stocks
POST http://localhost:5000/api/stocks/searching/all

request:

```json
{
    "content": "one"
}
```

*user = Headers.Authorization

response: 

```json
[
    {
        "_id": "64289e83999f4228ff00183c",
        "title": "Title One",
        "description": "Description",
        "author": "Author Name",
        "createdAt": "2023-04-01T21:13:39.730Z",
        "updatedAt": "2023-04-01T21:13:39.730Z",
        "__v": 0
    }
]
```