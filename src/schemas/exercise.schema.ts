import { MuscleGroup } from "@prisma/client";
import { z } from "zod";

const MuscleGroupEnum = z.nativeEnum(MuscleGroup);

export const CreateExerciseSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, {
        message: "El nombre del ejercicio debe tener al menos 3 caracteres",
      })
      .max(40, {
        message: "El nombre del ejercicio no puede tener más de 40 caracteres",
      }),
    image: z.string().optional(), 
    muscleGroups: z
      .array(MuscleGroupEnum)
      .min(1, { message: "Debes seleccionar al menos un grupo muscular" }),
  }),
});

export const UpdateExerciseSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, {
        message: "El nombre del ejercicio debe tener al menos 3 caracteres",
      })
      .max(40, {
        message: "El nombre del ejercicio no puede tener más de 40 caracteres",
      })
      .optional(),
    image: z.string().optional(), 
    muscleGroups: z
      .array(MuscleGroupEnum)
      .min(1, { message: "Debes seleccionar al menos un grupo muscular" })
      .optional(),
  }),
  params: z.object({
    id: z
      .string()
      .uuid({ message: "El ID del ejercicio debe ser un UUID válido" }),
  }),
});
