import { MuscleGroup } from "@prisma/client";


export interface Exercise {
  name: string;
  image?: string;
  muscleGroup: MuscleGroup[];
}
