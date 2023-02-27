// 🙎🏻‍♂️ 💬 Properties Collection

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
