### 🙎🏻‍♂️ 💬  

Create a Real Estate Marketplace Website.
On the website there are blogs and real estate trading pages.

start with
Create a database schema.

### ChatGPT

Users collection

```js
use realestate_db

db.createCollection("Users")

db.Users.insertOne({
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "555-555-1212",
  "created_at": new Date(),
  "updated_at": new Date()
})
```

Properties Collection

```js
use realestate_db

db.createCollection("Properties")

db.Properties.insertOne({
  "user_id": ObjectId("614d5b5d43c02aaf6efdcf22"),
  "title": "Spacious 2BR Apartment with Balcony",
  "description": "This beautiful 2-bedroom apartment has a large balcony with stunning views of the city. The bedrooms are spacious and the living area is perfect for entertaining guests. The building has a pool and gym for residents to use.",
  "address": "123 Main St",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA",
  "zip_code": "90001",
  "price": 2000.00,
  "bedrooms": 2,
  "bathrooms": 2,
  "square_feet": 1200,
  "lot_size": 0.0,
  "property_type": "Apartment",
  "status": "Available",
  "created_at": new Date(),
  "updated_at": new Date(),
  "images": [
    ObjectId("614d5c7043c02aaf6efdcf25"),
    ObjectId("614d5c7e43c02aaf6efdcf26")
  ]
})
```

Blogs Collection

```js
use realestate_db

db.createCollection("Blogs")

db.Blogs.insertOne({
  "user_id": ObjectId("614d5b5d43c02aaf6efdcf22"),
  "title": "10 Tips for First-Time Homebuyers",
  "content": "If you're a first-time homebuyer, it can be overwhelming to navigate the real estate market. Here are 10 tips to help you get started...",
  "created_at": new Date(),
  "updated_at": new Date()
})
```