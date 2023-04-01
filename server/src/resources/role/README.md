# Requests For Roles

### Create A New Role
POST http://localhost:5000/api/roles/create

request:

*value: required

*user = Headers.Authorization

```json
{
    "value": "SUPEROWNER",
}
```

response: 

```json
{
    "name": "New Chain 1111111",
    "creator": "63d77404e7e361abcc402be9",
    "owner": "63d7796a6ffd2570cb72576e",
    "stores": [],
    "_id": "63d77e313fb2958dd496039b",
    "createdAt": "2023-01-30T08:22:09.709Z",
    "updatedAt": "2023-01-30T08:22:09.709Z",
    "__v": 0
}
```
