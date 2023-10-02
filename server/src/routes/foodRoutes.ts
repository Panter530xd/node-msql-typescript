import { foodGet } from "../services/foodGet";

import express, { Request, Response } from "express";

const router = express.Router();

router.get("/food-allergies", async (req: Request, res: Response) => {
  try {
    const foodAllergies = await foodGet();
    res.json(foodAllergies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
