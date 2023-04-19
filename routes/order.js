import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { placeOrder, showAllOrders, showOrderByOrderID, showOrderByUser } from '../controllers/order.js';


//creating a router
const router = express.Router();

//api to place a new order
router.post('/placeorder', isAuthenticated, placeOrder)

//api to show each n every order
router.get('/all', isAuthenticated, showAllOrders)

//api to show order details
router.get('/:orderID', isAuthenticated, showOrderByOrderID)

//api to show all the orders of a user
router.get('/my/:userID', isAuthenticated, showOrderByUser)



export default router