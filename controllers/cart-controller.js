import CartModel from '../models/Cart.js';
import ProductModel from '../models/Product.js';

export const addCart = async (req, res) => {
    try {
        const cart = await CartModel.create(req.body);

        res.status(201).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message,
        })
    }
}

export const addItemToCart = async (req, res) => {
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
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getCarts = async (req, res) => {
    try {
        const carts = await CartModel.find();
        if (carts.length === 0) {
            return res.status(404).json({
                message: "Корзины не найдены"
            })
        }

        res.status(200).json(carts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getCart = async (req, res) => {
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
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const getCartItems = async (req, res) => {
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
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const updateCart = async (req, res) => {
    const id = req.params.id;

    try {
        const cart = await CartModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const deleteCart = async (req, res) => {
    const id = req.params.id;

    try {
        const cart = await CartModel.findByIdAndDelete(id);

        if (!cart) {
            return res.status(404).json({ message: "Корзина не найдена" });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const clearCart = async (req, res) => {
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
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};