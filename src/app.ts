import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";

const PORT = process.env.PORT || 3001;

const originsConfig = [process.env.FRONTEND_URL || ""];

const app = express();
app.use(
  cors({
    origin: originsConfig,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
