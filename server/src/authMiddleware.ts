import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface User extends JwtPayload {
  id: string;
  email: string;
  role: string;
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
  console.log("Headers", req.headers);
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Auth Header", authHeader);
  if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  // const cookies = req.cookies;
  // if (!cookies?.access_token) return res.sendStatus(401);
  // const token = cookies.access_token;
  // console.log("Token", token);

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

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  if (user.role !== "admin") {
    return res.sendStatus(401);
  }

  next();
}

export function isUser(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;

  if (user.role !== "user") {
    return res.sendStatus(401);
  }

  next();
}
