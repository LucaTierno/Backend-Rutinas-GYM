import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getExercise = (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_GET_EXERCISE");
  }
};

const getExercises = (req: Request, res: Response) => {
  try {
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

const postExercise = ({ body }: Request, res: Response) => {
  try {
    res.send(body);
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
