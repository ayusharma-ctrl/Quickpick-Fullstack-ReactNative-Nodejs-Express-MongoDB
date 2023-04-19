import { Order } from "../models/order.js";
import { User } from "../models/user.js"


//create a new order
export const placeOrder = async (req, res) => {
    try {
        const { address } = req.body
        const user = await User.findById(req.user._id)
        const cartTotal = user.cart.reduce((temp, item) => {
            return temp + item.total;
        }, 0)

        await Order.create({
            user,
            cname: user.name,
            cemail: user.email,
            cphone: user.phone,
            caddress: address,
            items: user.cart,
            total: cartTotal
        })
        user.cart = [];
        await user.save();
        res.status(201).json({ success: true, message: "Order Placed" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//show all orders of all users
export const showAllOrders = async (req, res) => {
    try {
        const order = await Order.find()
        res.status(200).json({ success: true, message: "All orders", orders: order })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//show order details by passing order id
export const showOrderByOrderID = async (req, res) => {
    try {
        const { orderID } = req.params
        const order = await Order.findById(orderID)
        if (!order) {
            return res.status(404).json({ success: false, message: "No order found!" })
        }
        res.status(200).json({ success: true, message: "All orders", orders: order })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// show all the orders placed by a particular user
export const showOrderByUser = async (req, res) => {
    try {
        const { userID } = req.params
        const orders = await Order.find({ user: userID })
        res.status(200).json({ success: true, message: "My orders", orders: orders })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}