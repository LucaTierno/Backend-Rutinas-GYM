import { Request, Response } from "express";

import { userService } from "../services/user.services";

const handlePostUser = async ({ body }: Request, res: Response) => {
  try {
    const response = await userService.createUser(body);
    res.send(response);
  } catch (error) {

  }
};

const handleGetUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await userService.getUserById(id);
    res.send(response);
  } catch (error) {

  }
};

const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const response = await userService.getUsers();
    res.send(response);
  } catch (error) {

  }
};

const handleUpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await userService.updateUserById(id, body);
    res.send(response);
  } catch (error) {

  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUserById(id);
    res.send(response);
  } catch (error) {

  }
};

export const userController = {
  handlePostUser,
  handleGetUser,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser,
};
