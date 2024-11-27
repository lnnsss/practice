import express from "express";
import CartController from "../controllers/cart-controller.js";

const router = express.Router();

// Создание одной корзины
router.post("/", CartController.addCart);

// Получение всех корзин
router.get('/', CartController.getCarts)

// Получение одной корзины по ID
router.get("/:id", CartController.getCart);

// Получение товаров корзины по ID
router.get('/:id/items', CartController.getCartItems);

// Добавление товара в корзину по ID
router.patch('/:id/items', CartController.addItemToCart);

// Обновление одной корзины по ID
router.patch("/:id", CartController.updateCart);

// Удаление одной корзины по ID
router.delete("/:id", CartController.deleteCart);

// Очистка корзины по ID
router.delete('/:id/clear', CartController.clearCart);


export default router;
