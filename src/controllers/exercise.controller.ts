import { Response } from "express";
import { exerciseService } from "../services/exercise.services";
import { RequestExt } from "../interfaces/requestExt.interface";

//* Obtener el ejercicio por el ID
const handleGetExercise = async (req: RequestExt, res: Response) => {
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

//* Obtener todos los ejercicios
const handleGetExercises = async (req: RequestExt, res: Response) => {
  try {
    const response = await exerciseService.getExercises();
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

//* Crear el ejercicio
const handlePostExercise = async ({ body }: RequestExt, res: Response) => {
  try {
    const response = await exerciseService.createExercise(body);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";

    res.status(status).json({ error: message });
  }
};

//* Actualizar el ejercicio
const handleUpdateExercise = async (req: RequestExt, res: Response) => {
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
const handleDeleteExercise = async (req: RequestExt, res: Response) => {
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

export const exerciseController = {
  handleGetExercise,
  handleGetExercises,
  handleUpdateExercise,
  handlePostExercise,
  handleDeleteExercise,
};
