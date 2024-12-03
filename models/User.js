import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
    }
}, {
    timestamps: true,
})

export default mongoose.model("User", UserSchema);
