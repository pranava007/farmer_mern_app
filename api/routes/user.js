const express = require('express');
const multer = require('multer');
const router = express.Router();
const { User } = require('../models/user'); // Import the User model
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/update', upload.single('image'), async (req, res) => {

  const { name, phoneNumber, dob, gender, address, pincode, imageStatus, latitude, userId, longitude } = req.body;
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
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }

  try {
    // Save user profile data and image data
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.dob = dob;
    user.gender = gender;
    user.address = address;
    user.pincode = pincode;
    user.image = image;
    user.latitude = latitude;
    user.longitude = longitude;
    await user.save();
    res.send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Failed to register user');
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const c = Object.assign({}, user);
    c.image = null
    console.log("user", c)
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log("user.image", user.image, Object.keys(user.image))
    const userDataWithImage = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dob: user.dob,
      gender: user.gender,
      address: user.address,
      pincode: user.pincode,
      latitude: user.latitude,
      longitude: user.longitude,
      image: (!user.image || Object.keys(user.image).length === 0) ? null : {
        contentType: user.image.contentType,
        data: user.image.data?.toString('base64') // Convert binary data to base64 string
      }
    };

    res.json(userDataWithImage);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Failed to retrieve user');
  }
});

module.exports = router;