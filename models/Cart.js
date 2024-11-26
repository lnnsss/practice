import mongoose, {model, Schema} from "mongoose";

const CartItemSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [CartItemSchema]
})

export default model("Cart", CartSchema);