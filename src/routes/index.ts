import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").slice(0, -1).join(".");

  if (file.endsWith(".routes")) {
    return file.split(".routes").shift();
  }

  return null;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName && cleanName !== "index") {
    import(path.join(PATH_ROUTER, fileName)).then((moduleRouter) => {
      console.log(`Cargando la ruta... /${cleanName}`);
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
