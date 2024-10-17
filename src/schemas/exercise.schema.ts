import { z } from "zod";

export const CreateExerciseSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    muscleGroups: z.string().array(),
  }),
});
