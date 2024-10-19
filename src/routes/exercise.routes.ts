import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import {
  CreateExerciseSchema,
  UpdateExerciseSchema,
} from "../schemas/exercise.schema";
import { checkSession } from "../middleware/session";

const router = Router();

router.get("/", exerciseController.handleGetExercises);

router.get("/:id", exerciseController.handleGetExercise);

router.post(
  "/", 
  schemaValition(CreateExerciseSchema),
  exerciseController.handlePostExercise
);

router.put(
  "/:id", 
  schemaValition(UpdateExerciseSchema),
  exerciseController.handleUpdateExercise
);

router.delete("/:id", exerciseController.handleDeleteExercise);

export { router };
