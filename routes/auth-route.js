import express from "express";
import AuthController from "../controllers/auth-controller.js";
import { registerValidation } from "../validations/auth.js";

const router = express.Router();

// Регистрация c валидацией
router.post('/registration', registerValidation, AuthController.registration);

// Вход в аккаунт
router.post('/login', AuthController.login);

export default router;
