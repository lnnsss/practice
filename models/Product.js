import mongoose, {Schema} from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgURL: [String]
}, {
    timestamps: true,
})

export default mongoose.model("Product", ProductSchema);