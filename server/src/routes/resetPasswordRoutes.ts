import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { databaseConection } from "../config/database";

dotenv.config();

const router = express.Router();

router.post(
  "/reset-password/:id/:token",
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const { token, id } = req.params;

    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and newPassword are required." });
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_TOKEN as string
      );

      const userId = (decodedToken as any).id;

      const hashedPassword = await bcrypt.hash(password, 10);

      await databaseConection("UPDATE users SET password = ? WHERE id = ?", [
        hashedPassword,
        userId,
      ]);

      res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Error changing password." });
    }
  }
);

export default router;
