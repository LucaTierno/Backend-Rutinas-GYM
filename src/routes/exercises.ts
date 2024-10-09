import { Request, Response, Router } from "express";

const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send({ data: 'ACA_LOS_MODELOS'})
})


export { router };
