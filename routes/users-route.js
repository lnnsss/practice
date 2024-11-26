import express from "express";
import {getUsers, getUserByID, updateUserByID, deleteUserByID} from "../controllers/users-controller.js";

const router = express.Router();

// Получение всех пользователей
router.get('/', getUsers);

// Получение одного пользователя по ID
router.get('/:id', getUserByID);

// Изменение одного пользователя по ID
router.patch('/:id', updateUserByID);

// Удаление одного пользователя по ID
router.delete('/:id', deleteUserByID);

export default router;