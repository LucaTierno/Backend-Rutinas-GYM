import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "https://frontend-rutinas-gym-production-46a6.up.railway.app/",
  })
);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
