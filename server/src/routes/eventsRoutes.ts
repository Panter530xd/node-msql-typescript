import express, { Request, Response } from "express";
import { createEvent, eventsGet } from "../services/eventsService";

const router = express.Router();

router.post("/events", async (req: Request, res: Response) => {
  const eventsData = req.body;

  try {
    await createEvent(eventsData);
    res.json({ message: "Events successful" });
  } catch (error) {
    console.error("Error during Events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/events", async (req: Request, res: Response) => {
  try {
    const registrations = await eventsGet();
    res.json(registrations);
  } catch (error) {
    console.error("Error getting Events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
