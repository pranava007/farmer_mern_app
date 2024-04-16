// Import Mongoose
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming productId references the product model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userId references the user model
        required: true,
    },
    quantity1: {
        type: Number,
        required: true,
    },
    quantity2: {
        type: Number,
        required: true,
    },
    quantity3: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

// Create a User model based on the schema
const Order = mongoose.model('Order', orderSchema);

// Export the User model
module.exports = { Order };
