import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { checkSession } from "../middleware/session";

const router = Router();

router.get("/", checkSession, userController.handleGetUsers);

router.get("/:id", checkSession, userController.handleGetUser);

router.put("/:id", checkSession, userController.handleUpdateUser);

router.delete("/:id", checkSession, userController.handleDeleteUser);

export { router };
