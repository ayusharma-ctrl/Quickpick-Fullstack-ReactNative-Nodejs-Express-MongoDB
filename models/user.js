import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password is too weak."],
        //if i fetch the userData, then i'll not get password, because it is select:false
        select: false
    },
    address: [{
        street: "String",
        locality: "String",
        city: "String",
        state: "String",
        country: "String",
        pincode: Number
    }],
    usertype: {
        type: String,
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    otp: Number,
    otp_expiry: Date,
    reset_otp: Number,
    reset_otp_expiry: Date,

    verified: {
        type: Boolean,
        default: false,
    },

    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
        },
        total: {
            type: Number,
        }
    }],

})

//Note:if you are using mongoDB compass, TTL index will not work.
//there you have to create this index manually in collection by selecting column name, its type & other options...
schema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", schema)