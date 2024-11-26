import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { UpdateUserSchema } from "../schemas/user.schema";

const router = Router();

router.get("/", userController.handleGetUsers);

router.get("/:id", userController.handleGetUser);

router.put(
  "/:id",
  schemaValition(UpdateUserSchema),
  userController.handleUpdateUser
);

router.delete("/:id", userController.handleDeleteUser);

export { router };
