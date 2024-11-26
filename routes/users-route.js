import express from "express";
import { getUsers, getUserByID } from "../controllers/users-controller.js";

const router = express.Router();

// Получение всех пользователей
router.post('/', getUsers);

// Получение одного пользователя по ID
router.post('/:id', getUserByID);

export default router;