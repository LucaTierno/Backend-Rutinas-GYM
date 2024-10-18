import { Request, Response } from "express";

import { userService } from "../services/user.services";
import { RequestExt } from "../interfaces/requestExt.interface";

const handleGetUser = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const response = await userService.getUserById(id);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handleGetUsers = async (req: RequestExt, res: Response) => {
  try {
    const response = await userService.getUsers();
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handleUpdateUser = async (req: 
  RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await userService.updateUserById(id, body);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handleDeleteUser = async (req: 
  RequestExt, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUserById(id);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

export const userController = {
  handleGetUser,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser,
};
