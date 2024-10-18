import { Request, Response } from "express";
import { authService } from "../services/auth.services";

const handlerRegister = async ({ body }: Request, res: Response) => {
  try {
    const response = await authService.registerNewUser(body);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

const handlerLogin = async ({ body }: Request, res: Response) => {
  try {
    const response = await authService.loginUser(body);
    res.send(response);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error inesperado.";
    res.status(status).json({ error: message });
  }
};

export const authController = {
  handlerRegister,
  handlerLogin,
};
