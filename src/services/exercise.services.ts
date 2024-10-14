import { Exercise } from "../interfaces/exercise.interface";
import ExerciseModel from "../models/exercise.model";

const createExercise = async (exercise: Exercise) => {
  const resCreate = await ExerciseModel.create(exercise);
  return resCreate;
};

const getExercises = async () => {
  const resExercises = await ExerciseModel.find({});
  return resExercises;
};

const getExercise = async (id: string) => {
  const resExercise = await ExerciseModel.findById({ _id: id });
  return resExercise;
};

const updateExercise = async (id: string, data: Exercise) => {
  const resUpdate = await ExerciseModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return resUpdate;
};

const deleteExercise = async (id: string) => {
  const resDelete = await ExerciseModel.findOneAndDelete({ _id: id });
  return resDelete;
};

export const exerciseService = {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};
