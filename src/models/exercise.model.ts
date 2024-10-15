import { Schema, model } from "mongoose";
import { Exercise } from "../interfaces/exercise.interface";
import { MuscleGroup } from "../enums/muscleGroup.enum";

const ExerciseSchema = new Schema<Exercise>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    muscleGroup: {
      type: [String],
      enum: Object.values(MuscleGroup),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ExerciseModel = model("Exercises", ExerciseSchema);

export default ExerciseModel;
