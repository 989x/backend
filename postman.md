## Postman

## USER

### register
POST > localhost:5000/api/auth/register
{
    "username":"john",
    "email": "john@gmail.com",
    "password":"123456"
}

### login
POST > localhost:5000/api/auth/login
{
    "username":"asda",
    "password":"123456"
}

### update user
PUT > localhost:5000/api/users/621f3439863270df79651c98
{
    "userId":"621f3439863270df79651c98",
    "username":"johnupdate",
    "password":"123"
}

### delete user
DELETE > localhost:5000/api/users/621f2c661ce8583b78c5fc75
{
    "userId":"621f2c661ce8583b78c5fc75",
    "username":"asda",
    "password":"123456"
}

### get user byID (for console userID) 🔴 server error 500 ? 48.30
POST > localhost:5000/api/auth/register
{
    "username":"johnupdate2",
    "email":"john@gmail.com",
    "password":"123456"
}

### get user byID
GET > localhost:5000/api/users/621f3439863270df79651c98
{
    "username":"johnupdate2",
    "email":"john@gmail.com",
    "password":"123456"
}

<br/>

## POST

### post 
POST > localhost:5000/api/posts/ 🟡 if err because > title unique: true
{
    "username":"johnupdate2",
    "title":"test2",
    "desc":"test desc"
}

### update post
PUT > localhost:5000/api/posts/621f6c9150db297ee7a2bb99
{
    "username":"johnupdate2",
    "title":"test2updated",
    "desc":"test desc"
}

### delete post
DELETE > localhost:5000/api/posts/621f6c9150db297ee7a2bb99
{
    "username":"johnupdate2",
    "title":"test2updated",
    "desc":"test desc"
}

### get post byID
GET > localhost:5000/api/posts/621f6c662f763fbbd6655d7c
{

}

### get all post
GET > localhost:5000/api/posts/
{

}

### get post's user
GET > localhost:5000/api/posts?user=jane
{

}