// registerRoutes.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models/product'); // Import the User model
const { User } = require('../models/user'); // Import the User model
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle user registration
router.get('/list/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Create a new user based on the request body
    console.log("request", req.body)

    let productList = await Product.find({ userId: userId });
    if (!productList) {
      return res.status(404).send('Product not found');
    }
    let updatedProduct = map_products(productList)
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/list', async (req, res) => {
  try {

    let productList = await Product.find();
    if (!productList) {
      return res.status(404).send('Product not found');
    }
    let updatedProduct = map_products(productList)
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/search/:userId/:searchText', async (req, res) => {
  try {
    const searchText = req.params.searchText;
    const userId = req.params.userId;
    const productList = await findProductsNearUser(userId, searchText);
    if (!productList) {
      return res.status(404).send('Product not found');
    }
    let updatedProduct = map_products(productList)
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).send(error);
  }
});

const findProductsNearUser = async (userId, searchText) => {
  const user = await User.findById(userId); // Assuming you have a User model
  console.log("user", user)
  const userLat = user.latitude;
  const userLon = user.longitude;

  const productList = await Product.find({ name: { $regex: searchText, $options: 'i' } });

  const nearbyProducts = [];

  for (const product of productList) {
    const farmerId = product.userId;
    const farmer = await User.findById(farmerId);
    const distance = haversineDistance(userLat, userLon, farmer.latitude, farmer.longitude);
    console.log("distance", distance)
    if (distance <= 5) {
      nearbyProducts.push(product);
    }
  }

  return nearbyProducts;
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    let productList = await Product.find({ _id: productId });
    if (!productList) {
      return res.status(404).send('Product not found');
    }
    let updatedProduct = map_products(productList)
    res.json(updatedProduct[0])
  } catch (error) {
    res.status(400).send(error);
  }

});

function map_products(productList) {
  let updatedProduct = []
  for (let product of productList) {
    //console.log("product",product.image)
    let productImage = (!product.image || Object.keys(product.image).length === 0) ? null : {
      contentType: product.image.contentType,
      data: product.image.data.toString('base64') // Convert binary data to base64 string
    };

    let p = {
      _id: product.id,
      name: product.name,
      description: product.description,
      quantity1: product.quantity1,
      quantity2: product.quantity2,
      quantity3: product.quantity3,
      category: product.category,
      userId: product.userId,
      image: productImage
    }
    updatedProduct.push(p)
  }

  return updatedProduct;
}

router.post('/create', upload.single('image'), async (req, res) => {
  const { name, description, quantity1, quantity2, quantity3, imageStatus, category, userId } = req.body;
  console.log("req", req)
  // Read image data from file

  let image = {}
  if (imageStatus == "Added") {
    image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  // Find the user by their ID
  const product = new Product()
  if (!product) {
    return res.status(404).send('User not found');
  }

  try {
    // Save user profile data and image data
    product.name = name;
    product.description = description;
    product.quantity1 = quantity1;
    product.quantity2 = quantity2;
    product.quantity3 = quantity3;
    product.category = category;
    product.image = image;
    product.userId = userId
    await product.save();
    res.send('Product created successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Failed to create product');
  }
});

module.exports = router;
