// registerRoutes.js
const express = require('express');
const router = express.Router();
const { Notification } = require('../models/notification'); // Import the User model
const { Product } = require('../models/product');

// Handle user registration
router.get('/list/:userId', async (req, res) => {
  try {
    // Create a new user based on the request body
    const userId = req.params.userId;
    const notification = await Notification.find({ userId: userId })
    console.log("notifd")
    res.json(notification);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/farmer/list/:farmerId', async (req, res) => {
  try {
    // Create a new user based on the request body
    const farmerId = req.params.farmerId;
    const products = await Product.find({ userId: farmerId })

    const productIds = products.map(product => product._id);
    console.log("productIds", productIds)
    const notification = await Notification.find({ productId: { $in: productIds } })

    res.json(notification);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/status/update', async (req, res) => {
  const { notificationId, status } = req.body;
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return res.status(404).send('User not found');
  }
  notification.status = status
  await notification.save();
  res.send('Notification updated successfully');
})
module.exports = router;
