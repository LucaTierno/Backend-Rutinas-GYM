import { NextFunction, Request, Response, Router } from "express";
import { messageApiController } from "../controllers/huggingFace.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  messageApiController.handleMessageApi(req, res, next);
});

export { router };
