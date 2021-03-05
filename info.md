
----  POST /todos  ----
This will create new todos

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{
  "title" : "Learn git",
  "description" : "Try fork using others repo",
  "status" : "active",
  "due_date" : "2021-03-21"
}

Response 
{
  "id": 1,
  "title" : "Learn git",
  "description" : "Try fork using others repo",
  "status" : "active",
  "due_date" : "2021-03-21",
}

----  GET /todos ----
Get all todos list

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{
 
}

Response 
[
  {
  "id": 1,
  "title" : "Learn git",
  "description" : "Try fork using others repo",
  "status" : "active",
  "due_date" : "2021-03-21"
  },
  {
  "id": 2,
  "title" : "Learn javascript",
  "description" : "Try ES6 function",
  "status" : "nonactive",
  "due_date" : "2021-04-21"
  }
]

----   GET /todos/:id  ----
Get todos based on id

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{
 
}

Response 
{
  "id": 1,
  "title" : "Learn git",
  "description" : "Try fork using others repo",
  "status" : "active",
  "due_date" : "2021-03-21"
}

----  PUT /todos/:id  ----
This will update todos based on Id

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{
  "title" : "Learn Sequel",
  "description" : "Try Sequel in different condition",
  "status" : "active",
  "due_date" : "2021-03-21"
}

Response 
{
  "id": 3,
  "title" : "Learn Sequel",
  "description" : "Try Sequel in different condition",
  "status" : "active",
  "due_date" : "2021-03-21"
}

----  PATCH /todos/:id  ----
This will update status of todos list

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{

}

Response 
{
  "id": 3,
  "title" : "Learn Sequel",
  "description" : "Try Sequel in different condition",
  "status" : "nonactive",
  "due_date" : "2021-03-21"
}

----  DELETE /todos/:id  ----
This will delete status of todos list

Request Header
{
  "Content-Type":"application/json"
  "accessToken" : "asijifjaionci2133ir"
}

Request Body
{

}

Response 
{
  message: 'todo success to delete'
}

----  POST /register  ----
This will delete status of todos list

Request Header
{
  "Content-Type":"application/json"
}

Request Body
{
{
    "email" : "krisna.post@gmail.com",
    "password" : "123456"
}
}

Response 
{
  {
    "id" : "1",
    "email" : "krisna.post@gmail.com"
  }
}

----  POST /login  ----
This will delete status of todos list

Request Header
{
  "Content-Type":"application/json"
}

Request Body
{
{
    "email" : "krisna.post@gmail.com",
    "password" : "123456"
}
}

Response 
{
  accessToken : "1929ajf93uhuhsdivhaoi"
}

Response Code : Response Code Description
200: Ok
201: Created
400: Bad request
404: Not found
500: Internal server error

