import { handleError } from "../handleError.js";
import ProductModel from "../models/Product.js";

export default class ProductsController {
    static async createProduct(req, res) {
        const { title, artist, price, imgURL } = req.body;

        try {
            const newProduct = {
                title,
                artist,
                price,
                ...(imgURL && { imgURL })
            }
            const doc = new ProductModel(newProduct);
        
            const product = await doc.save();
        
            res.status(200).json({
                message: "Товар успешно добавлен",
                product
            });
        } catch(err) {
            handleError(err)
        }
    }
    static async getProducts(req, res) {
        try {
            const { title, artist } = req.query;
            const query = {};
    
            if (artist) {
                query.artist = artist;
            }
            if (title) {
                query.title = title;
            }
    
            const products = await ProductModel.find(query);
    
            if (products.length === 0) {
                return res.status(404).json({
                    message: 'Товары не найдены',
                });
            }
    
            return res.status(200).json({
                message: "Товары найдены",
                products
            });
        } catch (err) {
            handleError(err);
        }
    }
    static async getProductByID(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.findById(id);

            if (!product) {
                return res.status(404).json({
                    message: 'Товар не найден',
                })
            }

            res.status(200).json({
                message: "Товар найден",
                product
            });
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
    
            res.status(200).json({
                message: "Товар успешно изменен",
                product
            });
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
