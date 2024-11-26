import express from "express";
import { registration, login } from "../controllers/auth-controller.js";

const router = express.Router();

// Регистрация c валидацией
router.post('/registration', registration);

// Вход в аккаунт
router.post('/login', login);

export default router;