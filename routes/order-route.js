import express from "express";
import OrderController from "../controllers/order-controller";

const router = express.Router();

// Создание заказа
router.post("/", OrderController.addOrder);

// Получение всех заказов
router.get("/", OrderController.getOrders);

// Получение одного заказа по ID
router.get("/:id", OrderController.getOrder);

// Обновление одного заказа по ID
router.patch("/:id", OrderController.updateOrder);

// Удаление одного заказа по ID
router.delete("/:id", OrderController.deleteOrder);


export default router;
