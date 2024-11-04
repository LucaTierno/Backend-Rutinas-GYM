import { z } from "zod";


export const CreateCategoryPlanSchema = z.object({
    body: z.object({
      name: z.string().min(3).max(30),
    }),
  });
  