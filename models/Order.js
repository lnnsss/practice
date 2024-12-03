import {model, Schema} from "mongoose";

const OrderItemSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [OrderItemSchema],
    status: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default model("Order", OrderSchema);
