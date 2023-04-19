import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
        trim: true
    },

    pdescription: {
        type: String,
        required: true,
        trim: true
    },

    pcategory: {
        type: String,
        required: true,
    },

    psubcategory: {
        type: String,
        required: true,
    },

    pimage: [{
        public_id: "String",
        url: "String",
    }],

    pprice: {
        type: Number,
        required: true,
    },

    pdiscount: {
        type: Number,
        required: true,
    },

    pstock: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Product = mongoose.model("Product", schema)