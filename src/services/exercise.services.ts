import { Exercise } from '../interfaces/exercise.interface';
import ExerciseModel from "../models/exercise.model";

const createExercise = async (exercise: Exercise) => {
  const resCreate = await ExerciseModel.create(exercise);
  return resCreate;
};

const getExercises = async () => {
  const resExercises = await ExerciseModel.find({});
  return resExercises;
};

export const exerciseService = {
  createExercise,
  getExercises,
};
