import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import CartModel from "../models/Cart.js";
import {validationResult} from "express-validator";
import dotenv from 'dotenv';
import { handleError } from "../handleError.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

export default class AuthController {
    static async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
    
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
    
            const userDoc = new UserModel({
                email: req.body.email,
                passwordHash: hash,
            });
    
            const user = await userDoc.save();
    
            const newCart = await CartModel.create({ userId: user._id });
    
            user.cartId = newCart._id;
            await user.save();
    
            const token = jwt.sign({
                _id: user._id,
            }, secret, {
                expiresIn: '24h',
            });
    
            const { passwordHash, ...userData } = user._doc;
    
            res.json({ ...userData, token });
        } catch (err) {
            handleError(err)
        }
    }
    static async login(req, res) {
        try {
            const user = await UserModel.findOne({email: req.body.email});
            if (!user) {
                return res.status(404).json({
                    message: 'Польщователь не найден',
                })
            }
    
            const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
            if (!isValidPass) {
                return res.status(400).json({
                    message: 'Неверный логин или пароль',
                })
            }
    
            const token = jwt.sign({
                _id: user._id,
            }, secret, {
                expiresIn: '24h',
            })
    
            const {passwordHash, ...userData} = user._doc;
    
            res.json({...userData, token});
        } catch (err) {
            handleError(err)
        }
    }
}
