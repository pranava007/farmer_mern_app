// Import Mongoose
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    quantity1: {
        type: String,
        required: false
    },
    quantity2: {
        type: String,
        required: false
    },
    quantity3: {
        type: String,
        required: false
    },
    image: {
        data: Buffer, // Store image data as Buffer
        contentType: String // Store image content type
    },
    userId: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    }
});

// Create a User model based on the schema
const Product = mongoose.model('Product', productSchema);

// Export the User model
module.exports = { Product };
