import mongoose from "mongoose";


const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cname: {
        type: String,
        required: true
    },
    cphone: {
        type: String,
        required: true
    },
    cemail: {
        type: String,
        required: true
    },
    caddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    items: [],
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Order = mongoose.model("Order",schema)