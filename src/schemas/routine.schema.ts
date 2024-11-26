import { z } from "zod";

export const CreateRoutineExerciseSchema = z.object({
  body: z.object({
    sets: z
      .number({ invalid_type_error: "Las series deben ser un número" })
      .int({ message: "Las series deben ser un número entero" })
      .positive({ message: "Las series deben ser un número positivo" })
      .max(100)
      .nullable()
      .optional(),
    reps: z
      .number({ invalid_type_error: "Las repeticiones deben ser un número" })
      .int({ message: "Las repeticiones deben ser un número entero" })
      .positive({ message: "Las repeticiones deben ser un número positivo" })
      .max(20)
      .nullable()
      .optional(),
    time: z
      .number({ invalid_type_error: "El tiempo debe ser un número" })
      .int({ message: "El tiempo debe ser un número entero" })
      .positive({ message: "El tiempo debe ser un número positivo" })
      .nullable()
      .optional(),
    comment: z
      .string()
      .max(100, {
        message: "El comentario no puede tener más de 100 caracteres",
      })
      .optional(),
  }),
});
