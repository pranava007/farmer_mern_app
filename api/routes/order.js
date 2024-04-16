const express = require('express');
const { Order } = require('../models/order');
const { Notification } = require('../models/notification');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const router = express.Router();

router.get('/list/:userId', async (req, res) => {

    const userId = req.params.userId;
    const order = await Order.find({ userId: userId });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

router.get('/user/list/:userId', async (req, res) => {

    const userId = req.params.userId;
    const orderList = await Order.find({ userId: userId });
    let ordersList = []
    for (let order of orderList) {
        const product = await Product.findById(order.productId)
        const farmerId = product.userId
        const user = await User.findById(order.userId)
        const farmer = await User.findById(farmerId)
        console.log("farmer",farmer.address)
        let productImage = (!product.image || Object.keys(product.image).length === 0) ? null : {
            contentType: product.image.contentType,
            data: product.image.data.toString('base64') // Convert binary data to base64 string
        };
        ordersList.push({
            product: product.name, description: product.description,
            user: user.name,
            farmerName: farmer.name,
            purchaseDate: order.purchaseDate, quantity1: order.quantity1,
            farmerPhoneNumber: farmer.phoneNumber,
            farmerAddress: farmer.address,
            quantity2: order.quantity2, quantity3: order.quantity3,
            productImage: productImage
        })
    }
    if (!ordersList) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(ordersList);
});

router.post('/create', async (req, res) => {
    try {
        const { userId, productId, quantity1, quantity2, quantity3 } = req.body;
        console.log("req.body", req.body)
        const order = new Order(req.body);
        await order.save(); // Save the user to the database
        const product = await Product.findById({ _id: order.productId })
        const user = await User.findById({ _id: order.userId })
        const notification = new Notification({
            userId: userId,
            productId: productId,
            notificationDate: new Date(),
            message: `${user.name} placed order for ${product.name} successfully.`,
            status: "Pending",
        },)
        await notification.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
