import { Schema, Types, model, Model } from "mongoose";
import { Exercise } from "../interfaces/exercise.interface";

const ExerciseSchema = new Schema<Exercise>(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
