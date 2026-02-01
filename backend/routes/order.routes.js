import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/order.controllers.js'
import adminAuth from './../middlewares/adminAuth.js';
import authUser from './../middlewares/auth.js';

const orderRouter = express.Router()

// Payment Options
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// User features
orderRouter.post('/user-orders', authUser, userOrders);

// Verify Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter