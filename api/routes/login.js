const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'secret_key', { expiresIn: '1h' });

    res.json({ token, userId: user._id, name: user.name, role: user.role });
});

module.exports = router;
