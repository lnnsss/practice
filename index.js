import express from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/auth-route.js";
import usersRoutes from "./routes/users-route.js";
import productsRoutes from "./routes/products-route.js";
import dotenv from "dotenv";

const app = express();

dotenv.config(); // для использования переменных окружения
const PORT = process.env.PORT || 3001;
const MongoDBURL = process.env.MONGO_URL;

mongoose.connect(MongoDBURL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('DB Error', err));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, (err) => {
    if(err) {
        return console.error(err);
    }
    console.log(`Listening on port ${PORT}`);
})