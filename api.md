## set env 

```bash
npm init -y

yarn add express mongoose dotenv multer

yarn add nodemon

yarn add bcrypt
```

### mongoose 
https://mongoosejs.com/

### bcrypt
https://www.npmjs.com/package/bcrypt



<br/>



## Postman

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