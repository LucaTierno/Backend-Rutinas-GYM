import { z } from "zod";
import { Day } from "@prisma/client";

const DayEnum = z.nativeEnum(Day);

const CreateRoutineExerciseSchema = z.object({
  exerciseId: z.string().uuid(),
  sets: z.number().int().positive().optional(),
  reps: z.number().int().positive().optional(),
  comment: z.string().max(100).optional(),
});

export const CreateRoutineSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(40),
    day: DayEnum,
    // userId: z.string().uuid(),
    routineExercises: z.array(CreateRoutineExerciseSchema).min(1),
  }),
});

const UpdateRoutineExerciseSchema = z.object({
  exerciseId: z.string().uuid().optional(),
  sets: z.number().int().positive().optional(),
  reps: z.number().int().positive().optional(),
  comment: z.string().max(100).optional(),
});

export const UpdateRoutineSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(40).optional(),
    day: DayEnum.optional(),
    // userId: z.string().uuid(),
    routineExercises: z.array(UpdateRoutineExerciseSchema).min(1).optional(),
  }),
  params: z.object({
    routineId: z.string().uuid(),
  }),
});
