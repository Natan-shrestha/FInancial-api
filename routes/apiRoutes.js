const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const transactionController = require('../controllers/transactionController');
const rateLimiter = require('../middleware/rateLimiter');
const authMiddleware = require('../middleware/authMiddleware');

// Customer data route
router.get('/customer/:id', authMiddleware, rateLimiter, customerController.getCustomerData);

// Transaction route
router.post('/transaction', authMiddleware, rateLimiter, transactionController.executeTransaction);

module.exports = router;
