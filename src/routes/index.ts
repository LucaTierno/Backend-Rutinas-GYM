import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

// Función actualizada para limpiar el nombre de archivo y obtener solo el nombre antes de ".routes.ts"
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").slice(0, -1).join("."); // Remueve la última extensión (ejemplo: ".ts")

  // Si el archivo sigue el patrón "nombre-ruta.routes.ts", obtiene el nombre antes de ".routes"
  if (file.endsWith(".routes")) {
    return file.split(".routes").shift(); // Obtiene solo el nombre base (antes de ".routes")
  }

  return null; // Si el archivo no sigue el patrón, devuelve null
};

// Carga de rutas
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
