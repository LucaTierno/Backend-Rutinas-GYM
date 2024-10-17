import { z } from "zod";

export const CreateExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    image: z.string().optional(),
    muscleGroups: z.string().array(),
  }),
});
