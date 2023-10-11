import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface User {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
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

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: JsonWebTokenError | null, user: User | undefined) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.sendStatus(403);
      }

      req.user = user;

      next();
    }
  );
}
