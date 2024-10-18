import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.handleGetUsers);
router.get("/:id", userController.handleGetUser);
router.post("/", userController.handlePostUser);
router.put("/:id", userController.handleUpdateUser);
router.delete("/:id", userController.handleDeleteUser);

export { router };
