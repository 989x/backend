## FULL - Lama Dev - React Blog 

fontend - React Node.js Full Stack Blog App Tutorial | MERN Stack APP Full Course 
- https://www.youtube.com/watch?v=LelifxOrzvw

backend - Node.js Blog App REST API with MongoDB
- https://www.youtube.com/watch?v=OML9f6LXUUs

---

### Base on > localhost:5000/api/

---

### MongoDB - modals 

| categorise     |  posts                |   users                  |
|---             |---                    |---                       |
| name : String  |  title : String       |   username : String      |
|                |  desc : String        |   email : String         |
|                |  photo : String       |   password : String      |
|                |  username : String    |   profilepic : String    |
|                |  photo : Array        |                          |

### ExpressJS - routes 
   
| auth                           |  category    |   posts                           |   users                    |
|---                             |---           |---                                |---                         |
| register : post ( /register )  |  post ( / )  |   CREATE POST : post ( / )        |  UPDATE : put ( /:id )     |
| login : post ( /login )        |  get ( / )   |   UPDATE POST : put ( /:id )      |  DELETE : delete ( /:id )  |
|                                |              |   DELETE POST : delete ( /:id )   |  GET USER : get ( /:id )   |
|                                |              |   GET POST : get ( /:id )         |                            |
|                                |              |   GET ALL POSTS : get ( / )       |                            |

---
