import express from 'express'
import { addToCart, updateCart, getCartInfo } from '../controllers/cart.controllers.js'
import authUser from '../middlewares/auth.js';

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getCartInfo);
cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);

export default cartRouter