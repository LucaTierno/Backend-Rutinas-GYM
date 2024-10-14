import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { exerciseService } from "../services/exercise.services";

//* Obtener el ejercicio por el ID
const handleGetExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await exerciseService.getExercise(id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_EXERCISE");
  }
};

//* Obtener todos los ejercicios
const handleGetExercises = async (req: Request, res: Response) => {
  try {
    const response = await exerciseService.getExercises();
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_EXERCISES");
  }
};

//* Crear el ejercicio
const handlePostExercise = async ({ body }: Request, res: Response) => {
  try {
    const response = await exerciseService.createExercise(body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_EXERCISE");
  }
};

//* Actualizar el ejercicio
const handleUpdateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedExercise = await exerciseService.updateExercise(id, body);

    res.send(updatedExercise);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_EXERCISE");
  }
};

//* Eliminar el ejercicio
const handleDeleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteExercise = await exerciseService.deleteExercise(id);
    res.send(deleteExercise);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_EXERCISE");
  }
};

export const exerciseController = {
  handleGetExercise,
  handleGetExercises,
  handleUpdateExercise,
  handlePostExercise,
  handleDeleteExercise,
};
