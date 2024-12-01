import { Exercise } from "../interfaces/exercise.interface";
import prisma from "../lib/prisma";

//* Crear ejercicio
const createExercise = async (data: Exercise) => {
  try {
    const resCreate = await prisma.exercise.create({ data });

    return resCreate;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw { status: 409, message: "El ejercicio ya existe." };
    }

    throw { status: 500, message: "Error al crear el ejercicio." };
  }
};

//* Obtener todos los ejercicios
const getExercises = async () => {
  try {
    const resExercises = await prisma.exercise.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });

    if (!resExercises) {
      throw { status: 400, message: "No se pudo obtener ningún ejercicio" };
    }

    return resExercises;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }

    throw { status: 500, message: "Error al obtener los ejercicios." };
  }
};

//* Obtener un ejercicio por ID
const getExercise = async (id: string) => {
  try {
    const resExercise = await prisma.exercise.findUnique({
      where: {
        id,
      },
    });

    if (!resExercise) {
      throw { status: 400, message: "No se pudo obtener el ejercicio" };
    }

    return resExercise;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener el ejercicio." };
  }
};

//* Actualizar un ejercicio por ID
const updateExercise = async (id: string, data: Exercise) => {
  try {
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
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al actualizar el ejercicio." };
  }
};

//* Eliminar un ejercicio
const deleteExercise = async (id: string) => {
  try {
    const resDelete = await prisma.exercise.delete({
      where: {
        id,
      },
    });

    if (!resDelete) {
      throw { status: 400, message: "No se pudo eliminar el ejercicio" };
    }

    return resDelete;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al eliminar el ejercicio." };
  }
};

export const exerciseService = {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};
