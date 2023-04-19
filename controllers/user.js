import { User } from "../models/user.js"
import { sendToken } from "../utils/sendToken.js"
import { sendMail } from '../utils/sendMail.js'
import bcrypt from 'bcrypt'
import { Product } from "../models/product.js"

// 1
export const addNewUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User is already exist!"
            })
        }

        const otp = Math.floor(Math.random() * 1000000);
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000)
        })

        await sendMail(email, "Quickpick Verification Code", `Hey ${name}, your Quickpick verification code is: ${otp}.`);

        sendToken(user, res, "OTP sent to your email, please verify your account!", 201)
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// 2
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid username!"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password!"
            })
        }

        sendToken(user, res, `Welcome back ${user.name}!`, 200);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 3
export const getMyProfile = (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 4
export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Logged Out!"
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 5
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user Found!"
            })
        }
        await user.deleteOne();
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Deleted!"
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 6
export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { email } = req.user;
        const user = await User.findOne({ email }).select("+password")
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
        const isNewPasswordCorrect = await bcrypt.compare(newPassword, user.password)
        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "Please enter all the details before submitting!"
            })
        }

        if (!isOldPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Old Password is invalid!"
            })
        }
        if (isNewPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "New Password should be unique!"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({
            success: true,
            message: "Password is updated!"
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 7
export const verify = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.user._id);
        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid OTP or has been Expired!" });
        }
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;
        await user.save();
        sendToken(user, res, "Account Verified!", 200)
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// 8
export const addressAdd = async (req, res) => {
    try {
        const { street, locality, city, state, country, pincode } = req.body;
        const user = await User.findById(req.user._id);
        user.address.push({ street, locality, city, state, country, pincode })
        await user.save()
        res.status(200).json({
            success: true,
            message: "Added Successfully"
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// 9
export const addressDelete = async (req, res) => {
    try {
        const { addressID } = req.params;
        const user = await User.findById(req.user._id);
        user.address = user.address.filter((e) => e._id.toString() !== addressID.toString())
        await user.save()
        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// 10
export const addressUpdate = async (req, res) => {
    try {
        const { addressID } = req.params;
        const { street, locality, city, state, country, pincode } = req.body;
        const user = await User.findById(req.user._id);
        user.addressUpdate = user.address.find((e) => e._id.toString() === addressID.toString());
        user.addressUpdate.street = street;
        user.addressUpdate.locality = locality;
        user.addressUpdate.city = city;
        user.addressUpdate.state = state;
        user.addressUpdate.country = country;
        user.addressUpdate.pincode = pincode;
        await user.save()
        res.status(200).json({
            success: true,
            message: "Updated Successfully"
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// 11
export const addressSaved = (req, res) => {
    try {
        res.json({
            success: true,
            user: req.user.address
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}

//12
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }
        const otp = Math.floor(Math.random() * 1000000);
        user.reset_otp = otp;
        user.reset_otp_expiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendMail(email, "Quickpick Verification Code", `Hey ${user.name}, your Quickpick verification code is: ${otp}. If you didn't request for this, please ignore this mail.`);
        res.status(200).json({ success: true, message: `OTP sent to ${email}` });

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//13
export const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        const user = await User.findOne({
            reset_otp: otp,
            reset_otp_expiry: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "OTP invalid or has been expired!" })
        }

        const changedPassword = await bcrypt.hash(newPassword, 12)
        user.password = changedPassword;
        user.reset_otp = null;
        user.reset_otp_expiry = null;
        await user.save();
        res.status(200).json({ success: true, message: "Password is changed successfully!" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// 14
export const cartAddItem = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        const user = await User.findById(req.user._id);
        const alreadyExist = user.cart.findIndex((e) => e.product.toString() === productID.toString())
        if (alreadyExist !== -1) {
            const Q = user.cart[alreadyExist].quantity
            user.cart[alreadyExist].quantity = Q + 1;
            user.cart[alreadyExist].total += product.pprice-product.pdiscount; 
            await user.save();
            return res.status(201).json({ success: true, message: "Product added to cart" })
        }
        user.cart.push({ product, quantity: 1, total: product.pprice-product.pdiscount })
        await user.save();
        res.status(201).json({ success: true, message: "Product added to cart" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// 15
export const cartRemoveItem = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID)
        const user = await User.findById(req.user._id);
        const alreadyExist = user.cart.findIndex((e) => e.product.toString() === productID.toString())
        if (alreadyExist !== -1) {
            const Q = user.cart[alreadyExist].quantity
            if (Q > 1) {
                user.cart[alreadyExist].quantity = Q - 1;
                user.cart[alreadyExist].total -= product.pprice-product.pdiscount;
            }
            else if (Q === 1) {
                user.cart = user.cart.filter((e) => e.product.toString() !== productID.toString());
            }
            await user.save();
            return res.status(201).json({ success: true, message: "Product removed" })
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// 16
export const cartDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, message: "Cart Items", cart: user.cart })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}