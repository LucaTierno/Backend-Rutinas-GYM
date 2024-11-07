import { Day } from "@prisma/client";
import { RoutineExercise } from "./routineExercise.interface";

export interface Routine {
  // userId: string;
  day: Day;
  routineExercises: RoutineExercise[];
}
