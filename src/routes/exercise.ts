import { Router } from "express";
import {
  deleteExercise,
  getExercise,
  getExercises,
  postExercise,
  updateExercise,
} from "../controllers/exercise";

const router = Router();

router.get("/", getExercises);
router.get("/:id", getExercise);
router.post("/", postExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export { router };
