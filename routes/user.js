import express from 'express';
import { addNewUser, addressAdd, addressDelete, addressSaved, addressUpdate, cartAddItem, cartDetails, cartRemoveItem, deleteUser, forgotPassword, getMyProfile, login, logout, resetPassword, updatePassword, verify } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

//api to create new user
router.post("/new", addNewUser)

//api to login
router.post("/login", login)

//api to logout
router.get("/logout", logout)

//api to get user's profile
router.get("/me", isAuthenticated, getMyProfile)

//api to update user's password
router.put("/updatePassword", isAuthenticated, updatePassword)

//api to delete user account
router.delete("/delete", isAuthenticated, deleteUser)

//api to verify account with otp
router.post("/verify", isAuthenticated, verify)

//api to forget password - we will send email
router.post("/forgotPassword", forgotPassword)

//api to reset password - we will send otp and newPassword
router.put("/resetPassword", resetPassword)

//api to add a new address
router.post("/address/new", isAuthenticated, addressAdd)

//api to delete an address
router.delete("/address/:addressID", isAuthenticated, addressDelete)

//api to update an address
router.put("/address/:addressID", isAuthenticated, addressUpdate)

//api to get all the saved addresses
router.get("/address/saved", isAuthenticated, addressSaved)

//api to get the cart items
router.get("/cart", isAuthenticated, cartDetails)

//api to add an item to cart
router.post("/cart/:productID", isAuthenticated, cartAddItem)

//api to remove an item from cart
router.put("/cart/:productID", isAuthenticated, cartRemoveItem)


export default router;