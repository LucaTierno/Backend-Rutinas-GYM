import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interfaces/requestExt.interface";

const checkSession = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || null;

    const jwt = jwtByUser?.split(" ").pop();

    const isUser = verifyToken(`${jwt}`);

    if (!isUser) {
      throw { status: 401, message: "Token inválido o expirado" };
    }
    
    req.user = isUser;

    next();
  } catch (error: any) {
    if (error.status) {
      throw error;
    }

    res.status(401);
    res.send("No tienes una sesión activa");
  }
};

export { checkSession };
