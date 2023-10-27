import express, { Request, Response } from "express";
import { createRegistration } from "../services/registrationUsers";

const router = express.Router();

router.post("/registration", async (req: Request, res: Response) => {
  const registrationData = req.body;

  try {
    await createRegistration(registrationData);
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
