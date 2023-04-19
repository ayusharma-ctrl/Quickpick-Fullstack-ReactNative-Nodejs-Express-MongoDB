import jwt from 'jsonwebtoken'

export const sendToken = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    })

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        usertype: user.usertype,
        verified: user.verified
    }

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    }).json({
        success: true,
        message,
        user: userData,
    })
}