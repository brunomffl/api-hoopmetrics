import express from "express";
import { teste } from "./routes";

const app = express();

app.use(express.json());
app.use(teste);

export { app };