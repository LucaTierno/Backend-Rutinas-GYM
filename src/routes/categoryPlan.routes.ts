import { Router } from "express";
import { schemaValition } from "../middleware/schemaValidator.middleware";
import { CreateCategoryPlanSchema } from "../schemas/categoryPlan.schema";
import { categoryPlanController } from "../controllers/categoryPlan.controller";

const router = Router();

router.post(
  "/",
  schemaValition(CreateCategoryPlanSchema),
  categoryPlanController.handlerPostCategoryPlan
);

router.get("/", categoryPlanController.handlerGetCategoryPlans);

export { router };
