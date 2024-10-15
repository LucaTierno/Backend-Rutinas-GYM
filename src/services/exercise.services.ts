import { Exercise } from "../interfaces/exercise.interface";
import prisma from "../lib/prisma";

const createExercise = async (data: Exercise) => {
  const resCreate = await prisma.exercise.create({ data });
  return resCreate;
};

const getExercises = async () => {
  const resExercises = await prisma.exercise.findMany();
  return resExercises;
};

const getExercise = async (id: string) => {
  const resExercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
  });
  return resExercise;
};

const updateExercise = async (id: string, data: Exercise) => {
  const resUpdate = await prisma.exercise.update({
    where: {
      id,
    },
    data,
  });

  return resUpdate;
};

const deleteExercise = async (id: string) => {
  const resDelete = await prisma.exercise.delete({
    where: {
      id,
    },
  });
  return resDelete;
};

export const exerciseService = {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};
