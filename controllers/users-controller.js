import { handleError } from "../handleError.js";
import UserModel from "../models/User.js";
<<<<<<< Updated upstream
import CartModel from "../models/Cart.js";
=======
import bcrypt from "bcryptjs";
>>>>>>> Stashed changes

export default class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserModel.find();
    
            if (!users) {
                return res.status(404).json({
                    message: 'Пользователи не найдены',
                })
            }
    
            res.status(200).json({
                message: "Пользователи найдены",
                users
            });
        } catch(err) {
            handleError(err)
        }
    }
    static async getUserByID(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({_id: id});
    
            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден',
                })
            }
    
            res.status(200).json({
                message: "Пользователь найден",
                user
            });
        } catch(err) {
            handleError(err)
        }
    }
    static async updateUserByID(req, res) {
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const id = req.params.id;
            const updateData = {...req.body, passwordHash: hash};

            const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                });
            }
    
            res.status(200).json({
                message: "Пользователь успешно изменен",
                user
            });
        } catch (err) {
            handleError(err)
        }
    }
    static async deleteUserByID(req, res) {
        try {
            const id = req.params.id;
    
            const user = await UserModel.findByIdAndDelete(id);
    
            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                });
            }
    
            await CartModel.deleteMany({ userId: id });
    
            res.status(200).json({
                message: "Пользователь и его корзина успешно удалены",
                user
            });
        } catch (err) {
            handleError(err);
        }
    }
}
