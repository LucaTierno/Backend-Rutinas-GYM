import { Request, Response } from "express";
import { authService } from "../services/auth.services";

const handlerRegister = async (req: Request, res: Response) => {
  const { body } = req;
  const responseUser = await authService.registerNewUser(body);
  res.send(responseUser);
};

const handlerLogin = async (req: Request, res: Response) => {};

export const authController = {
  handlerRegister,
  handlerLogin,
};
