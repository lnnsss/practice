import express from "express";
import ProductsController from "../controllers/products-controller.js";

const router = express.Router();

// Добавление товара
router.post('/', ProductsController.createProduct);

// Получение всех товаров или по query запросу
router.get('/', ProductsController.getProducts);

// Получение одного товара по ID
router.get('/:id', ProductsController.getProductByID);

// Изменение одного товара по ID
router.patch('/:id', ProductsController.updateProductByID);

// Удаление одного товара по ID
router.delete('/:id', ProductsController.deleteProductByID);

export default router;
