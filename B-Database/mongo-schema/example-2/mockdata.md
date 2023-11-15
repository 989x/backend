### User

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "hashed_password_here",
  "role": "User",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "avatar_url_here",
    "contact": {
      "phone": "123-456-7890",
      "address": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345"
    }
  },
  "socialProfiles": [
    {
      "platform": "Twitter",
      "profileUrl": "twitter.com/johndoe"
    },
    {
      "platform": "LinkedIn",
      "profileUrl": "linkedin.com/in/johndoe"
    }
  ],
  "settings": {
    "notifications": {
      "email": true,
      "push": true
    },
    "preferences": {
      "language": "en_US",
      "currency": "USD"
    }
  },
  "createdAt": "2023-10-02T12:00:00Z",
  "updatedAt": "2023-10-02T12:00:00Z"
}
```

### Estate

```json
{
  "title": "Luxurious Beachfront Villa",
  "description": "A stunning villa with direct access to the private beach.",
  "price": 1200000,
  "location": {
    "type": "Point",
    "coordinates": [-118.4911912, 34.0195],
    "address": "456 Seaside Drive, Paradise Cove"
  },
  "propertyType": "Villa",
  "category": "61c40e1f", // Hypothetical ObjectId for 'Luxury Homes' category
  "tags": ["61c40e20", "61c40e21"], // Hypothetical ObjectIds for 'Beachfront' and 'Modern Design' tags
  "images": [
    "https://example.com/api/estate/architecture/1.jpg",
    "https://example.com/api/estate/architecture/2.jpg",
    "https://example.com/api/estate/architecture/3.jpg",
    "https://example.com/api/estate/architecture/4.jpg",
    "https://example.com/api/estate/architecture/5.jpg"
  ],
  "features": ["61c40e22", "61c40e23"], // Hypothetical ObjectIds for 'Infinity Pool' and 'Smart Home System' features
  "status": "For Sale",
  "owner": "7a0eed16-9430-4d68-901f-c0d4c1c3bf00", // Hypothetical ObjectId for the property owner
  "reviews": [
    {
      "user": "7a0eed16-9430-4d68-901f-c0d4c1c3bf01", // Hypothetical ObjectId for User 1
      "rating": 4.5,
      "comment": "Impressive architecture and breathtaking views!"
    },
    {
      "user": "7a0eed16-9430-4d68-901f-c0d4c1c3bf02", // Hypothetical ObjectId for User 2
      "rating": 5,
      "comment": "The best property I've ever seen. Worth every penny."
    }
  ],
  "transactionHistory": [
    {
      "price": 1200000,
      "date": "2023-10-02T12:00:00Z",
      "previousOwner": "7a0eed16-9430-4d68-901f-c0d4c1c3bf03" // Hypothetical ObjectId for the previous owner
    }
  ],
  "analytics": {
    "views": 1200,
    "favorites": 380
  },
  "createdAt": "2023-10-02T12:00:00Z",
  "updatedAt": "2023-10-02T12:00:00Z"
}
```

### Message Schema Example:

```json
{
  "sender": "7a0eed16-9430-4d68-901f-c0d4c1c3bf00", // Hypothetical ObjectId for the sender user
  "receiver": "7a0eed16-9430-4d68-901f-c0d4c1c3bf01", // Hypothetical ObjectId for the receiver user
  "estate": "61c40e1f9f55c914a72c3e8f", // Hypothetical ObjectId for the related estate
  "message": "Hi, I'm interested in your property. Can we schedule a viewing?",
  "createdAt": "2023-10-02T12:30:00Z"
}
```

### Notification Schema Example:

```json
{
  "user": "7a0eed16-9430-4d68-901f-c0d4c1c3bf02", // Hypothetical ObjectId for the user receiving the notification
  "message": "You have a new message regarding the property.",
  "read": false,
  "createdAt": "2023-10-02T12:35:00Z"
}
```

### Transaction Schema Example:

```json
{
  "estate": "61c40e1f9f55c914a72c3e8f", // Hypothetical ObjectId for the related estate
  "buyer": "7a0eed16-9430-4d68-901f-c0d4c1c3bf03", // Hypothetical ObjectId for the buyer
  "seller": "7a0eed16-9430-4d68-901f-c0d4c1c3bf04", // Hypothetical ObjectId for the seller
  "price": 1200000,
  "transactionDate": "2023-10-02T13:00:00Z"
  // Add more fields to capture transaction details.
}
```