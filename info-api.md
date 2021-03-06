
----------------------------  POST /todos  ----------------------------

This will Create new Todos

Data params : <br>
accessToken 

Request Header
```
{
  "Content-Type":"application/json",
  "accessToken" : "irjigj34ij9i9ai9sdiv09ir09wier9u9advuer9q0er"
}
```

Request Body

Data params : 
- title (string) | required
- description (string) | required
- status (string) | optional with validation active or nonactive, default active
- due_date (date) | required with validation cannot input before today

Content :
```
{
  "title": "makan3",
  "description" : "banyak",
  "status" : "nonactive",
  "due_date" : "2021-03-15"
}
```

Success Response
Code : 201

Data params :
- id (integer)
- title (string)
- description (string)
- status (string)
- due_date (date)
- Quotes (object with property quote and author from 3rd party api)

```
Content :
{
  "id": 86,
  "title": "makan6",
  "description": "banyak",
  "status": "nonactive",
  "due_date": "2021-03-15",
  "Quotes": {
    "quote": "Wealth is the slave of the wise. The master of the fool.",
    "author": "Seneca"
  }
}
```
Error Response
Code : 400 <br>
Content :
```
{
 errors : [list of errors 1, list of errors 2],
 message : errors message
}
```

----------------------------  GET /todos  ----------------------------

Get all todos list

Data params : accessToken 

Request Header
```
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}
```

Data params :

Request Body
```
```

Data params : 

- id (integer) <br>
- title (string) <br>
- description (string) <br>
- status (string) <br>
- due_date (string) <br>
- createdAt (date) <br>
- updatedAt (date) <br>
- UserId (integer) <br>

Response 
```
[
  {
    "id": 79,
    "title": "makan5",
    "description": "banyak",
    "status": "active",
    "due_date": "2021-03-15T00:00:00.000Z",
    "User": {
        "email": "krisna@mail.com"
    }
  },
  {
    "id": 77,
    "title": "makan5",
    "description": "banyak",
    "status": "active",
    "due_date": "2021-03-15T00:00:00.000Z",
    "User": {
        "email": "krisna@mail.com"
    }
  },
  {
    "id": 86,
    "title": "makan6",
    "description": "banyak",
    "status": "nonactive",
    "due_date": "2021-03-15T00:00:00.000Z",
    "User": {
        "email": "krisna@mail.com"
    }
  }
]
```
----------------------------  GET /todos/id  ----------------------------

Get all todos list by parameter id

Request Header
```
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}
```
Data params :

Request Body
```
```

Data params : 
- id (integer) <br>
- title (string) <br>
- description (string) <br>
- status (string) <br>
- due_date (string) <br>
- createdAt (date) <br>
- updatedAt (date) <br>
- UserId (integer) <br>

Response 
```
{
  "id": 68,
  "title": "Krisna",
  "description": "arere2",
  "status": "active",
  "due_date": "2021-03-17T00:00:00.000Z",
  "createdAt": "2021-03-06T08:37:12.519Z",
  "updatedAt": "2021-03-06T08:45:50.353Z",
  "UserId": 12
}
```
----------------------------  PUT /todos/id  ----------------------------

This will Update Todos

Data params :
accessToken 

Request Header
```
{
  "Content-Type":"application/json",
  "accessToken" : "irjigj34ij9i9ai9sdiv09ir09wier9u9advuer9q0er"
}
```

Request Body

Data params : 
- title (string) | required
- description (string) | required
- status (string) | optional with validation active or nonactive, default active
- due_date (date) | required with validation cannot input before today

Content :
```
{
  "title": "makan3",
  "description" : "banyak",
  "status" : "nonactive",
  "due_date" : "2021-03-15"
}
```
Success Response
Code : 200
Data params :
- title (string)
- description (string)
- status (string)
- due_date (date)

Content :
```
{
  "title": "makan6",
  "description": "banyak",
  "status": "nonactive",
  "due_date": "2021-03-15"
}
```

Error Response

Code : 400

Content :
```
{
 errors : [list of errors 1, list of errors 2],
 message : errors message
}
```
----------------------------  PATCH /todos/id  ----------------------------

This will Update status from selected todos id

Data params :
accessToken 

Request Header
```
{
  "Content-Type":"application/json",
  "accessToken" : "irjigj34ij9i9ai9sdiv09ir09wier9u9advuer9q0er"
}
```

Request Body

Data params : 
- status (string) | optional with validation active or nonactive, default active

Content :
```
{
  "status" : "nonactive",
}
```

Success Response
Code : 200
Data params :
- title (string)
- description (string)
- status (string)
- due_date (date)

Content :
```
{
  "description": "banyak",
  "title": "makan3",
  "status": "nonactive",
  "due_date": "2021-03-15T00:00:00.000Z"
}
```

Error Response

Code : 400

Content :
```
{
 errors : [list of errors 1, list of errors 2],
 message : errors message
}
```
data : 
- message (string)

Error Response

Code : 404

data : 
- errors (string)

Content :
```
{
  errors : 'Not Found'
}
```
----------------------------  Delete /todos/id  ----------------------------

This will delete Todos with id in params

Data params :
accessToken 

Request Header
```
{
  "Content-Type":"application/json",
  "accessToken" : "irjigj34ij9i9ai9sdiv09ir09wier9u9advuer9q0er"
}
```

Request Body

Data params : 

Content :
```
```

Success Response

Code : 200
Data params :
- message (string)

Content :
```
{
  message : "Todo success to delete"
}
```

Error Response

Code : 404

data : 
errors (string)

Content :
```
{
  errors : 'Not Found'
}
```

----------------------------  POST /register  ----------------------------

This will Create new User

Request Header
```
{
  "Content-Type":"application/json"
}
```

Request Body

Data params : 
- email (string) | required : Email to register
- password (string) | required : Password to register

Content :
```
{
  "email" : "krisna.post@gmail.com",
  "password" : "123456"
}
```
Success Response

Code : 201

Data params :
- id (integer)
- email (string)

Content :
```
{
  "id" : 1,
  "email" : "krisna.post@gmail.com"
}
```

Error Response

Code : 400

Content :
```
{
  errors : [list of errors 1, list of errors 2],
  message : errors message
}
```

----------------------------  POST /login  ----------------------------

This will check user login

Request Header
```
{
  "Content-Type":"application/json"
}
```

Request Body

Data params : 
- email (string) | required : Email to login
- password (string) | required : Password to login

Content :
```
{
  "email" : "krisna.post@gmail.com",
  "password" : "123456"
}
```

Success Response

Code : 200
Data params :

- accessToken (string)

Content :
```
{ 
  "accessToken" : eyJhbGciOiJIUzI9NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoia3Jpc25hQG1haWwuY29tIiwiaWF0IjoxNjE1MDM2MjY1fQ.Ki3UfsXvzUr8-wfNoyJrPBba7NW4OBviFBgqP7WBBH8
}
```

----------------------------  POST /googleLogin  ----------------------------

This will allow sign in from google

Request Header
```
{
  "Content-Type":"application/json"
}
```

Request Body

Data params : 
- googleToken (string) | required : Token Id from google

Content :
```
{
  "googleToken" : "juause90fu09eu9fia09d"
}
```

Success Response
Code : 200
Data params :
- accessToken (string)
- id (integer)
- email (string)

Content :
```
{ 
  "id" : "1",
  "email" : "kris@gmail.com",
  "accessToken" : eyJhbGciOiJIUzI9NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoia3Jpc25hQG1haWwuY29tIiwiaWF0IjoxNjE1MDM2MjY1fQ.Ki3UfsXvzUr8-wfNoyJrPBba7NW4OBviFBgqP7WBBH8
}
```

Error Response

Code : 400

Data params :
- errors (string)

Content :
```
{
  errors : "errors message"
}
```

Response Code : Response Code Description

200: Ok

201: Created

400: Bad request

404: Not found

500: Internal server error

