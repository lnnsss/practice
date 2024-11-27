import express from "express";
import UserController from "../controllers/users-controller.js";

const router = express.Router();

// Получение всех пользователей
router.get('/', UserController.getUsers);

// Получение одного пользователя по ID
router.get('/:id', UserController.getUserByID);

// Изменение одного пользователя по ID
router.patch('/:id', UserController.updateUserByID);

// Удаление одного пользователя по ID
router.delete('/:id', UserController.deleteUserByID);

export default router;
