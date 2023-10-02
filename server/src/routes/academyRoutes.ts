import express, { Request, Response } from "express";
import { getAcademy } from "../services/academyGet";

const router = express.Router();

router.get("/academy", async (req: Request, res: Response) => {
  try {
    const academy = await getAcademy();
    res.json(academy);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
