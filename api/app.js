const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const notificationRoutes = require('./routes/notification');
const historyRoutes = require('./routes/order');
const { logger } = require('./middleware/loggerMiddleware');

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors())
app.use(logger);
//app.use(authenticateToken);

const apiRouter = express.Router();

// Mount login and register routes
apiRouter.use('/login', loginRoutes);
apiRouter.use('/register', registerRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/product', productRoutes);
apiRouter.use('/order', historyRoutes);
apiRouter.use('/notification', notificationRoutes);

app.use('/api/v1', apiRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});
      
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
