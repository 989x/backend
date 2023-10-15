const mongoose = require('mongoose');

// ________________________________________ user schema ________________________________________

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Agent', 'User'], default: 'User' },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    contact: {
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
  socialProfiles: [{
    platform: String,
    profileUrl: String,
  }],
  settings: {
    notifications: {
      email: Boolean,
      push: Boolean,
    },
    preferences: {
      language: String,
      currency: String,
    },
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estate', // Reference to the 'estateSchema'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Add more fields for user history, security, and permissions.
});

// ________________________________________ estate schema ________________________________________

// Define the Estate Schema
const estateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
  },
  propertyType: { type: String, required: true }, // Add property type (e.g., 'Condo', 'House', etc.)
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  images: [{ type: String }], // URLs of property images
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
  status: { type: String, enum: ['For Sale', 'For Rent', 'Pending', 'Sold'], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  }],
  transactionHistory: [{
    price: { type: Number },
    date: { type: Date, default: Date.now },
    previousOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  analytics: {
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Add more advanced fields like energy efficiency ratings, legal documents, etc.
});

// ________________________________________ another schema ________________________________________

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

// Define the Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Define the Feature Schema
const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

// Define the Message Schema for user communication
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  estate: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Define the Transaction Schema
const transactionSchema = new mongoose.Schema({
  estate: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
  // Add more fields to capture transaction details.
});

// Create geospatial index for the location field
estateSchema.index({ location: '2dsphere' });

// ________________________________________ exports ________________________________________

// Create the models
const User = mongoose.model('User', userSchema);
const Estate = mongoose.model('Estate', estateSchema);
const Category = mongoose.model('Category', categorySchema);
const Tag = mongoose.model('Tag', tagSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Message = mongoose.model('Message', messageSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the models for use in your application
module.exports = { User, Estate, Category, Tag, Feature, Message, Notification, Transaction };
