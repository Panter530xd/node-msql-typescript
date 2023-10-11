import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
}
