import { MuscleGroup } from "../enums/muscleGroup.enum";

export interface Exercise {
    name: string,
    image: string,
    muscleGroup: MuscleGroup[],
}