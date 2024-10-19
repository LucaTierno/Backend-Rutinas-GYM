import { Router } from "express";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { checkSession } from "../middleware/session";
import { CreateRoutineSchema } from "../schemas/routine.schema";
import { routineController } from "../controllers/routine.controller";

const router = Router();

router.get("/", checkSession);

router.get("/:id", checkSession);

router.post(
  "/",
  schemaValition(CreateRoutineSchema),
  routineController.handlePostRoutine
);

router.put("/:id", checkSession);

router.delete("/:id", checkSession);

export { router };
