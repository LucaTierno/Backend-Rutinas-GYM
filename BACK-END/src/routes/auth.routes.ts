import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { RegisterUserSchema, LoginUserSchema } from "../schemas/auth.schema";

const router = Router();

router.post(
  "/register",
  schemaValition(RegisterUserSchema),
  authController.handlerRegister
);

router.post(
  "/login",
  schemaValition(LoginUserSchema),
  authController.handlerLogin
);

export { router };
