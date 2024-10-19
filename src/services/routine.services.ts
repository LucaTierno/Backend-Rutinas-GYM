import { Routine } from "../interfaces/routine.interface";
import prisma from "../lib/prisma";

const createRoutine = async (routine: Routine) => {
  try {
    const { userId, name, day, routineExercises } = routine;

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

    console.log("Rutina creada:", newRoutine);
    return newRoutine;
  } catch (error) {
    console.error("Error al crear la rutina:", error);
    throw new Error("No se pudo crear la rutina");
  }
};

export const routineService = {
  createRoutine,
};
