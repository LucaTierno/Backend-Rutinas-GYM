import { Routine } from "../interfaces/routine.interface";
import prisma from "../lib/prisma";

const createRoutine = async (routine: Routine, userId: string) => {
  try {
    const { name, day, routineExercises } = routine;

    const newRoutine = await prisma.routine.create({
      data: {
        name,
        day,
        userId,
        routineExercises: {
          create: routineExercises.map((exercise) => ({
            exercise: { connect: { id: exercise.exerciseId } },
            sets: exercise.sets,
            reps: exercise.reps,
            comment: exercise.comment,
          })),
        },
      },
      include: {
        routineExercises: {
          include: { exercise: true }, // Incluir los ejercicios en la respuesta
        },
      },
    });

    if (!newRoutine) {
      throw { status: 401, message: "No se pudo crear la rutina" };
    }

    return newRoutine;
  } catch (error: any) {

    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "Error al crear la rutina." };
  }
};

const getRoutinesForClient = async (userId: string) => {
  try {

    console.log(userId);
    

    const routines = await prisma.routine.findMany({
      where: {
        userId
      }
    })


    console.log(routines);
    
    return routines
  } catch (error) {
    
  }

}

export const routineService = {
  createRoutine,
  getRoutinesForClient,
};
