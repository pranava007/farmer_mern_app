// Import Mongoose
const mongoose = require('mongoose');

// Define the Product schema
const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    notificationDate: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
});

// Create a User model based on the schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the User model
module.exports = { Notification };
