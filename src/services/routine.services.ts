import prisma from "../lib/prisma";

//* Obtenemos todas las rutinas que tenga el cliente asignadas
const getRoutinesForClient = async (userId: string) => {
  try {
    const routines = await prisma.routine.findMany({
      where: {
        userId,
      },
      include: {
        routineExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!routines) {
      throw { status: 401, message: "No se encontro ningúna rutina asignada" };
    }

    return routines;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener las rutinas." };
  }
};

//* Obtenemos la rutina que tenga asignada el cliente por el Id
const getRoutineForClientById = async (userId: string, routineId: string) => {
  try {
    const routine = await prisma.routine.findFirst({
      where: {
        id: routineId,
        userId,
      },
      include: {
        routineExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!routine) {
      throw { status: 401, message: "No se encontro la rutina" };
    }

    return routine;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al obtener la rutina." };
  }
};
type UpdateRoutineExerciseData = {
  exerciseId: string;
  routineId: string;
  sets?: number;
  reps?: number;
  time?: number;
  comment?: string;
};

const createRoutineExercise = async (data: UpdateRoutineExerciseData) => {
  try {
    // Primero verificamos que el ejercicio existe
    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: data.exerciseId,
      },
    });

    if (!existingExercise) {
      throw { status: 404, message: "El ejercicio no existe" };
    }

    // Creamos la relación entre el ejercicio y la rutina con los detalles específicos
    const res = await prisma.routineExercises.create({
      data: {
        exerciseId: existingExercise.id,
        routineId: data.routineId,
        sets: data.sets,
        reps: data.reps,
        time: data.time,
        comment: data.comment,
      },
    });

    if (!res) {
      throw {
        status: 401,
        message: "No se pudo asignar el ejercicio a la rutina",
      };
    }

    return res;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      message: "Error al asignar el ejercicio a la rutina.",
    };
  }
};

const deleteExerciseInRoutine = async (id: string) => {
  try {

    const deleteExercise = await prisma.routineExercises.delete({
      where: {
        id
      }
    })

    if (!deleteExercise) {
      throw { status: 404, message: "No se encontro el ejercicio" };
    }

    return deleteExercise

  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al eliminar el ejercicio." };
  }
}

export const routineService = {
  getRoutinesForClient,
  getRoutineForClientById,
  createRoutineExercise,
  deleteExerciseInRoutine
};
