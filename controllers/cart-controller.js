import { handleError } from '../handleError.js';
import CartModel from '../models/Cart.js';
import ProductModel from '../models/Product.js';

export default class CartController {
    static async addCart(req, res) {
        try {
            const cart = await CartModel.create(req.body);
    
            res.status(201).send(cart);
        } catch (err) {
            handleError(err)
        }
    }
    static async addItemToCart(req, res) {
        const { productId, quantity } = req.body;
        const { id: cartId } = req.params;
    
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Продукт не найден" });
            }
    
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                return res.status(404).json({ message: "Корзина не найдена" });
            }
    
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
    
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
    
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } catch (err) {
            handleError(err)
        }
    }
    static async getCarts(req, res) {
        try {
            const carts = await CartModel.find();
            if (carts.length === 0) {
                return res.status(404).json({
                    message: "Корзины не найдены"
                })
            }
    
            res.status(200).json(carts);
        } catch (err) {
            handleError(err)
        }
    }
    static async getCart(req, res) {
        const id = req.params.id;
    
        try {
            const cart = await CartModel.findById(id);
            if (!cart) {
                return res.status(404).json({
                    message: "Корзина не найдена"
                })
            }
    
            res.status(200).json(cart);
        } catch (err) {
            handleError(err)
        }
    }
    static async getCartItems(req, res) {
        const id = req.params.id;
    
        try {
            const cart = await CartModel.findById(id);
            if (!cart) {
                return res.status(404).json({
                    message: "Корзина не найдена"
                })
            }
    
            const cartItems = cart.items;
    
            res.status(200).json(cartItems);
        } catch (err) {
            handleError(err)
        }
    }
    static async updateCart(req, res) {
        const id = req.params.id;
    
        try {
            const cart = await CartModel.findByIdAndUpdate(id, req.body, { new: true });
    
            res.status(200).json(cart);
        } catch (err) {
            handleError(err)
        }
    }
    static async deleteCart(req, res) {
        const id = req.params.id;
    
        try {
            const cart = await CartModel.findByIdAndDelete(id);
    
            if (!cart) {
                return res.status(404).json({ message: "Корзина не найдена" });
            }
    
            res.status(200).json(cart);
        } catch (err) {
            handleError(err)
        }
    }
    static async clearCart(req, res) {
        const id = req.params.id;
    
        try {
            const cart = await CartModel.findById(id);
    
            if (!cart) {
                return res.status(404).json({ message: "Корзина не найдена" });
            }
    
            cart.items = [];
    
            const updatedCart = await cart.save();
            res.status(200).json(updatedCart);
        } catch (err) {
            handleError(err)
        }
    }
}
