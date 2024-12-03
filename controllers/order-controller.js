import { handleError } from '../handleError.js';
import OrderModel from '../models/Order.js';

export default class OrderController {
    static async addOrder(req, res) {
        try {
            const order = await OrderModel.create(req.body);
    
            res.status(201).json({
                message: "Заказ создан",                
                order
            });
        } catch(err) {
            handleError(err);
        }
    }
    static async getOrders(req, res) {
        try {
            const orders = await OrderModel.find();
            if (orders.length === 0) {
                return res.status(404).json({
                    message: "Заказы не найдены"
                })
            }
    
        res.status(200).json({
            message: "Заказы получены",
            orders
        });
        } catch(err) {
            handleError(err);
        }
    }
    static async getOrder(req, res) {
        const id = req.params.id;
    
        try {
            const order = await OrderModel.findById(id);
            if (!order) {
                return res.status(404).json({
                    message: "Заказ не найден"
                })
            }
    
            res.status(200).json({
                    message: "Заказ получен",
                    order
            });
        } catch (err) {
            handleError(err)
        }
    }
    static async updateOrder(req, res) {
        const id = req.params.id;
    
        try {
            const order = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });
    
            res.status(200).json({
                message: "заказ обновлен",
                order
            });
        } catch (err) {
            handleError(err)
        }
    }
    static async deleteOrder(req, res) {
        const id = req.params.id;
    
        try {
            const order = await OrderModel.findByIdAndDelete(id);
    
            if (!order) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
    
            res.status(200).json({
                message: "Заказ успешно удален",
                order
            });
        } catch (err) {
            handleError(err)
        }
    }
}
