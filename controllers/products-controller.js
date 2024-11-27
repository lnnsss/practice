import { handleError } from "../handleError.js";
import ProductModel from "../models/Product.js";

export default class ProductsController {
    static async createProduct(req, res) {
        try {
            const doc = new ProductModel(req.body);
        
            const product = await doc.save();
        
            res.status(200).json(product);
        } catch(err) {
            handleError(err)
        }
    }
    static async getProducts(req, res) {
        try {
            const products = await ProductModel.find();
    
            if (!products) {
                return res.status(404).json({
                    message: 'Товары не найдены',
                })
            }
    
            res.status(200).json(products);
        } catch(err) {
            handleError(err)
        }
    }
    static async getProductByID(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.findOne({_id: id});
    
            if (!product) {
                return res.status(404).json({
                    message: 'Товар не найден',
                })
            }
    
            res.status(200).json(product);
        } catch(err) {
            handleError(err)
        }
    }
    static async updateProductByID(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
    
            const product = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!product) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                });
            }
    
            res.status(200).json(product);
        } catch (err) {
            handleError(err)
        }
    }
    static async deleteProductByID(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.findByIdAndDelete(id);
    
            if (!product) {
                return res.status(404).json({
                    message: "Товар не найден"
                });
            }
    
            res.status(200).json({
                message: "Товар успешно удалён",
                product
            })
        } catch (err) {
            handleError(err)
        }
    }
}
