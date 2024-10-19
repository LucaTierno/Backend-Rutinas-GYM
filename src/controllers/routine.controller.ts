import { Response } from "express";
import { exerciseService } from "../services/exercise.services";
import { RequestExt } from "../interfaces/requestExt.interface";
import { routineService } from "../services/routine.services";
import { JwtPayload } from "jsonwebtoken";

//* Crear rutina
const handlePostRoutine = async (req: RequestExt, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.user as JwtPayload;
  
    const response = await routineService.createRoutine(body, id);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";

    res.status(status).json({ error: message });
  }
};

// //* Obtener la rutina por el ID
const handleGetRoutine = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const response = await exerciseService.getExercise(id);
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
    const userId = req.user;

    const response = await routineService.getRoutinesForClient(
      userId as string
    );

    console.log("Este es el req user: ", req.user);

    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Actualizar la rutina
const handleUpdateRoutine = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedExercise = await exerciseService.updateExercise(id, body);

    res.send(updatedExercise);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Eliminar el ejercicio
const handleDeleteRoutine = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const deleteExercise = await exerciseService.deleteExercise(id);
    res.send(deleteExercise);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

export const routineController = {
  handleDeleteRoutine,
  handleGetRoutine,
  handleGetRoutines,
  handlePostRoutine,
  handleUpdateRoutine,
};
