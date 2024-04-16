// registerRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); // Import the User model

// Handle user registration
router.post('/', async (req, res) => {
  try {
    // Create a new user based on the request body
    console.log("request", req.body)
    const user = new User(req.body);
    console.log("request 1", user)
    await user.save(); // Save the user to the database
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
