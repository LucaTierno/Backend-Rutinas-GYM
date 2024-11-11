import { z } from "zod";

export const CreateRoutineExerciseSchema = z.object({
  // exerciseId: z.string().uuid(),
  // routineId: z.string().uuid(),
  sets: z.number().int().positive().nullable().optional(),
  reps: z.number().int().positive().nullable().optional(),
  time: z.number().int().positive().nullable().optional(),
  comment: z.string().max(100).optional(),
});
