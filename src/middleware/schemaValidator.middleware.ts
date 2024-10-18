import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValition =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next(); // Si pasa la validación, continúa
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          }))
        );
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  };