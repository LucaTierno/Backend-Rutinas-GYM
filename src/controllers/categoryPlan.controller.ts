import { Response } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { categoryPlanService } from "../services/categoryPlan.services";

const handlerPostCategoryPlan = async ({ body }: RequestExt, res: Response) => {
  try {
    const response = await categoryPlanService.createCategoryPlan(body);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handlerGetCategoryPlans = async (req: RequestExt, res: Response) => {
  try {
    const response = await categoryPlanService.getCategoryPlans();
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handlerDeleteCategoryPlans = async (
  { params }: RequestExt,
  res: Response
) => {
  try {
    const { id } = params;
    const response = await categoryPlanService.deleteCategoryPlan(id);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

export const categoryPlanController = {
  handlerPostCategoryPlan,
  handlerGetCategoryPlans,
  handlerDeleteCategoryPlans,
};
