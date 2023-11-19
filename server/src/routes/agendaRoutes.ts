import express, { Request, Response } from "express";
import { createAgenda } from "../services/agendaService";

const router = express.Router();

router.post("/agenda", async (req: Request, res: Response) => {
  const agendaData = req.body;

  try {
    await createAgenda(agendaData);
    res.json({ message: "Agenda successful" });
  } catch (error) {
    console.error("Error during Agenda:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
