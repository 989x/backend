// Estate Agents table
{
    "_id": ObjectId("6179c81371cc3f4c4a22f0bf"),
    "username": "johnsmith",
    "password": "password123",
    "first_name": "John",
    "last_name": "Smith",
    "email": "johnsmith@example.com",
    "phone_number": "555-555-1212"
  }
  
  // Clients table
  {
    "_id": ObjectId("6179c8e171cc3f4c4a22f0c0"),
    "estate_agent_id": ObjectId("6179c81371cc3f4c4a22f0bf"),
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "janedoe@example.com",
    "phone_number": "555-555-1213",
    "property_requirements": "3 bedrooms, 2 bathrooms, garage, yard",
    "viewing_history": [
      {
        "property_id": ObjectId("6179ca3571cc3f4c4a22f0c1"),
        "date": new Date("2023-02-20T10:00:00Z"),
        "notes": "Client liked the property, but the price is too high."
      }
    ]
  }
  
  // Properties table
  