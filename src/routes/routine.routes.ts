import { Router } from "express";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { checkSession } from "../middleware/session";
import { routineController } from "../controllers/routine.controller";
import { CreateRoutineExerciseSchema } from "../schemas/routine.schema";

const router = Router();

router.get("/", checkSession, routineController.handleGetRoutines);

router.get("/:id", checkSession, routineController.handleGetRoutine);

//* Asignamos los ejercicios a las rutinas ya creadas
router.post(
  "/",
  schemaValition(CreateRoutineExerciseSchema),
  routineController.handleCreateRoutineExercises
);

//* Eliminamos el ejercicio que esta en la rutina
router.delete("/:id", checkSession, routineController.handleDeleteRoutine);

export { router };
