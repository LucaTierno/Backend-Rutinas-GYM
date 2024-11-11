import { Response } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";
import { routineService } from "../services/routine.services";
import { JwtPayload } from "jsonwebtoken";

//* Obtener la rutina por el ID
const handleGetRoutine = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    const routineId = req.params.id;
    const response = await routineService.getRoutineForClientById(
      id,
      routineId
    );
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Obtener todas las rutinas
const handleGetRoutines = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    const response = await routineService.getRoutinesForClient(id);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Actualizar la rutina
const handleCreateRoutineExercises = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const resCreate = await routineService.createRoutineExercise(body);
    res.send(resCreate);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Eliminar el ejercicio
const handleDeleteRoutine = async (req: RequestExt, res: Response) => {
  // try {
  //   const { id } = req.params;
  //   const deleteExercise = await exerciseService.deleteExercise(id);
  //   res.send(deleteExercise);
  // } catch (error: any) {
  //   const status = error.status || 500;
  //   const message = error.message || "Error inesperado.";
  //   res.status(status).json({ error: message });
  // }
};

export const routineController = {
  handleDeleteRoutine,
  handleGetRoutine,
  handleGetRoutines,
  handleCreateRoutineExercises,
};
