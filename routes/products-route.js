import express from "express";
import {
    createProduct,
    getProducts,
    getProductByID,
    updateProductByID,
    deleteProductByID
} from "../controllers/products-controller.js";

const router = express.Router();

// Добавление товара
router.post('/', createProduct);

// Получение всех товаров
router.get('/', getProducts);

// Получение одного товара по ID
router.get('/:id', getProductByID);

// Изменение одного товара по ID
router.patch('/:id', updateProductByID);

// Удаление одного товара по ID
router.delete('/:id', deleteProductByID);

export default router;