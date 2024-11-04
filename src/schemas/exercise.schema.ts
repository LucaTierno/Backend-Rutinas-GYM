import { MuscleGroup } from "@prisma/client";
import { z } from "zod";

const MuscleGroupEnum = z.nativeEnum(MuscleGroup);

export const CreateExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    image: z.string().optional(),
    muscleGroups: z.array(MuscleGroupEnum).min(1),
  }),
});

export const UpdateExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20).optional(),
    image: z.string().optional(),
    muscleGroups: z.array(MuscleGroupEnum).min(1).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
