import { handleError } from "../handleError.js";
import UserModel from "../models/User.js";

export default class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserModel.find();
    
            if (!users) {
                return res.status(404).json({
                    message: 'Польщователи не найдены',
                })
            }
    
            res.status(200).json(users);
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
    
            res.status(200).json(user);
        } catch(err) {
            handleError(err)
        }
    }
    static async updateUserByID(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
    
            const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                });
            }
    
            res.status(200).json(user);
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
    
            res.status(200).json({
                message: "Пользователь успешно удалён",
                user
            })
        } catch (err) {
            handleError(err)
        }
    }
}
