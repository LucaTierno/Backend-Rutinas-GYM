import { z } from "zod";

export const CreateCategoryPlanSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(30, { message: "El nombre no puede tener más de 30 caracteres" }),
  }),
});
