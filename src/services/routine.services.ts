import { Day } from "@prisma/client";
import { Routine } from "../interfaces/routine.interface";
import prisma from "../lib/prisma";

//* Creamos la rutina
// const createRoutine = async (routine: Routine, userId: string) => {
//   try {
//     const { day, routineExercises } = routine;

//     const newRoutine = await prisma.routine.create({
//       data: {
//         day,
//         userId,
//         routineExercises: {
//           create: routineExercises.map((exercise) => ({
//             exercise: { connect: { id: exercise.exerciseId } },
//             sets: exercise.sets,
//             reps: exercise.reps,
//             comment: exercise.comment,
//           })),
//         },
//       },
//       include: {
//         routineExercises: {
//           include: { exercise: true }, // Incluir los ejercicios en la respuesta
//         },
//       },
//     });

//     if (!newRoutine) {
//       throw { status: 401, message: "No se pudo crear la rutina" };
//     }

//     return newRoutine;
//   } catch (error: any) {
//     if (error.status) {
//       throw error;
//     }
//     throw { status: 500, message: "Error al crear la rutina." };
//   }
// };
//* Ahora creamos las rutinas cuando creamos el usuario pero vacias

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

//* Actualizar la rutina
const updateRoutine = async (
  routineId: string,
  data: UpdateRoutineExerciseData
) => {
  try {
    // const routineUpdate = await prisma.routine.update({
    //   where: {
    //     id: routineId,
    //   },
    //   data: {
    //     ...data,
    //     routineExercises: data.routineExercises
    //       ? {
    //           upsert: data.routineExercises.map((exercise) => ({
    //             where: {
    //               id: exercise.routineId || "",
    //             },
    //             create: {
    //               exerciseId: exercise.exerciseId!,
    //               sets: exercise.sets,
    //               reps: exercise.reps,
    //               duration: exercise.duration,
    //               comment: exercise.comment,
    //             },
    //             update: exercise,
    //           })),
    //         }
    //       : undefined,
    //   },
    //   include: {
    //     routineExercises: true,
    //   },
    // });

    console.log("data en el back: ", data);

    const routineUpdate = await prisma.routineExercises.create({ data });

    if (!routineUpdate) {
      throw { status: 401, message: "No se pudo actualizar la rutina" };
    }

    return routineUpdate;
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
  updateRoutine,
};
