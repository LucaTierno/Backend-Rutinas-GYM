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

//* Asignamos el ejercicio a la rutina
const createRoutineExercise = async (data: UpdateRoutineExerciseData) => {
  try {
    const res = await prisma.routineExercises.create({ data });

    if (!res) {
      throw { status: 401, message: "No se pudo actualizar la rutina" };
    }

    return res;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al actualizar la rutina." };
  }
};

export const routineService = {
  getRoutinesForClient,
  getRoutineForClientById,
  createRoutineExercise,
};
