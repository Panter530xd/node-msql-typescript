import express, { Request, Response } from "express";
import { ForgotPassword } from "../services/forgotPassword";

import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/forgot-password", ForgotPassword);

export default router;
