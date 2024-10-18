import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { userService } from "../services/user.services";

const handlePostUser = async ({ body }: Request, res: Response) => {
  try {
    const response = await userService.createUser(body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_USER");
  }
};

const handleGetUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await userService.getUserById(id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER");
  }
};

const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const response = await userService.getUsers();
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS");
  }
};

const handleUpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await userService.updateUserById(id, body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_USER");
  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUserById(id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USER");
  }
};

export const userController = {
  handlePostUser,
  handleGetUser,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser,
};
