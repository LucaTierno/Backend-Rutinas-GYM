import { Router } from "express";
import { exerciseController } from "../controllers/exercise";

const router = Router();

router.get("/", exerciseController.handleGetExercises);
router.get("/:id", exerciseController.handleGetExercise);
router.post("/", exerciseController.handlePostExercise);
router.put("/:id", exerciseController.handleUpdateExercise);
router.delete("/:id", exerciseController.handleDeleteExercise);

export { router };
