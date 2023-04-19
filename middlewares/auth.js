import { User } from "../models/user.js";
import jwt from "jsonwebtoken"


// Check if the user is authenticated by verifying their token
export const isAuthenticated = async (req, res, next) => {
    try {
        // Get the token from the request cookies
        const { token } = req.cookies;

        // If the token doesn't exist, return an error message
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first!",
            });
        }

        // Verify the token using the JWT secret
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the decoded token's ID
        const user = await User.findById(decodedToken._id);

        // If the user doesn't exist, return an error message
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        // Set the user object in the request for future use
        req.user = user;

        // Continue to the next middleware function
        next();
    } 
    catch (error) {
        // If an error occurs, return a generic error message
        res.status(500).json({ success: false, message: error.message });
    }
};
