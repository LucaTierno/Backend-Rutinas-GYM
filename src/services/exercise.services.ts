import { Exercise } from "../interfaces/exercise.interface";
import prisma from "../lib/prisma";

const createExercise = async (data: Exercise) => {
  const resCreate = await prisma.exercise.create({ data });

  if (!resCreate) {
    throw { status: 400, message: "No se pudo crear el ejercicio" };
  }

  return resCreate;
};

const getExercises = async () => {
  const resExercises = await prisma.exercise.findMany();

  if (!resExercises) {
    throw { status: 400, message: "No se pudo obtener ningún ejercicio" };
  }

  return resExercises;
};

const getExercise = async (id: string) => {
  const resExercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
  });

  if (!resExercise) {
    throw { status: 400, message: "No se pudo obtener el ejercicio" };
  }

  return resExercise;
};

const updateExercise = async (id: string, data: Exercise) => {
  const resUpdate = await prisma.exercise.update({
    where: {
      id,
    },
    data,
  });

  if (!resUpdate) {
    throw { status: 400, message: "No se pudo actualizar el ejercicio" };
  }

  return resUpdate;
};

const deleteExercise = async (id: string) => {
  const resDelete = await prisma.exercise.delete({
    where: {
      id,
    },
  });

  if (!resDelete) {
    throw { status: 400, message: "No se pudo eliminar el ejercicio" };
  }

  return resDelete;
};

export const exerciseService = {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};
