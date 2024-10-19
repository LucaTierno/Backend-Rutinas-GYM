import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { checkSession } from "../middleware/session";

const router = Router();

router.get("/", userController.handleGetUsers);

router.get("/:id", userController.handleGetUser);

router.put("/:id", userController.handleUpdateUser);

router.delete("/:id", userController.handleDeleteUser);

export { router };
