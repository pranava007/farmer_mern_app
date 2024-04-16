// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store image content type
    },
    address: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    role:{
        type: String,
        required: false
    },
    latitude:{
        type: String,
        required: false
    },
    longitude:{
        type: String,
        required: false
    }
    // You can define other fields as needed
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = { User };
