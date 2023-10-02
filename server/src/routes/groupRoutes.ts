import express, { Request, Response } from "express";

import { groupsGet } from "../services/groupsGet";

const router = express.Router();

router.get("/groups", async (req: Request, res: Response) => {
  try {
    const groups = await groupsGet();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
