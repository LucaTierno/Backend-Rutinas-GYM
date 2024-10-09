import "dotenv/config";
import expres from "express";
import cros from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const PORT = process.env.PORT || 3001;

const app = expres();
app.use(cros());
app.use(router);
db().then(() => console.log("Conectado a la BD"));

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
