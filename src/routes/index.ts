import { Router } from "express";

const teste = Router();

teste.get("/", (req, res) => {
    return res.json({ message: "Teste de rota!" });
});

export { teste }