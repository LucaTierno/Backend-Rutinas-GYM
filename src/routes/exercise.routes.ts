import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import {
  CreateExerciseSchema,
  UpdateExerciseSchema,
} from "../schemas/exercise.schema";
import { checkSession } from "../middleware/session";

const router = Router();

router.get("/", checkSession, exerciseController.handleGetExercises);

router.get("/:id", checkSession, exerciseController.handleGetExercise);

router.post(
  "/", checkSession,
  schemaValition(CreateExerciseSchema),
  exerciseController.handlePostExercise
);

router.put(
  "/:id", checkSession,
  schemaValition(UpdateExerciseSchema),
  exerciseController.handleUpdateExercise
);

router.delete("/:id", checkSession, exerciseController.handleDeleteExercise);

export { router };
