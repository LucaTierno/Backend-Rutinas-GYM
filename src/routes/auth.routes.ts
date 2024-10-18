import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.handlerRegister);
router.post("/login", authController.handlerLogin);

export { router };
