import { Router } from "express";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { checkSession } from "../middleware/session";
import {
  CreateRoutineSchema,
  UpdateRoutineExerciseSchema,
  UpdateRoutineSchema,
} from "../schemas/routine.schema";
import { routineController } from "../controllers/routine.controller";

const router = Router();

router.get("/", checkSession, routineController.handleGetRoutines);

router.get("/:id", checkSession, routineController.handleGetRoutine);

// router.post(
//   "/",
//   checkSession,
//   schemaValition(CreateRoutineSchema),
//   routineController.handlePostRoutine
// );

router.put(
  "/:id",
  checkSession,
  schemaValition(UpdateRoutineExerciseSchema),
  routineController.handleUpdateRoutine
);

router.delete("/:id");

export { router };
