import express from "express";
import { addCart, addItemToCart, getCarts, getCart, getCartItems, updateCart, deleteCart, clearCart } from "../controllers/cart-controller.js";

const router = express.Router();

// Создание одной корзины
router.post("/", addCart);

// Получение всех корзин
router.get('/', getCarts)

// Получение одной корзины по ID
router.get("/:id", getCart);

// Получение товаров корзины по ID
router.get('/:id/items', getCartItems);

// Добавление товара в корзину по ID
router.patch('/:id/items', addItemToCart);

// Обновление одной корзины по ID
router.patch("/:id", updateCart);

// Удаление одной корзины по ID
router.delete("/:id", deleteCart);

// Очистка корзины по ID
router.delete('/:id/clear', clearCart);


export default router;