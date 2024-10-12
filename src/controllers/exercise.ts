import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { exerciseService } from "../services/exercise.services";

const getExercise = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_GET_EXERCISE");
  }
};

const getExercises = async (req: Request, res: Response) => {
  try {
    const resExercise = await exerciseService.getExercises();
    res.send(resExercise);
  } catch (error) {
    handleHttp(res, "ERROR_GET_EXERCISES");
  }
};

const updateExercise = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_EXERCISE");
  }
};

const postExercise = async ({ body }: Request, res: Response) => {
  try {
    const resExercise = await exerciseService.createExercise(body);
    res.send(resExercise);
  } catch (error) {
    handleHttp(res, "ERROR_POST_EXERCISE");
  }
};

const deleteExercise = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_EXERCISE");
  }
};

export {
  getExercise,
  getExercises,
  updateExercise,
  postExercise,
  deleteExercise,
};
