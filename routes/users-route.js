import express from "express";
import { getUsers, getUserByID } from "../controllers/users-controller.js";

const router = express.Router();

// Получение всех пользователей
router.get('/', getUsers);

// Получение одного пользователя по ID
router.get('/:id', getUserByID);

export default router;