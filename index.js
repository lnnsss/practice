import express from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/auth-route.js";
import usersRoutes from "./routes/users-route.js";

const PORT = process.env.PORT || 3001;
const MongoDBURL = 'mongodb+srv://bezborodnikovtimur:Nbveh2006!@cluster0.4djks.mongodb.net/november?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MongoDBURL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('DB Error', err));

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, (err) => {
    if(err) {
        return console.error(err);
    }
    console.log(`Listening on port ${PORT}`);
})