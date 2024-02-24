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

export async function authenticateTokenMiddleware(
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
  const cookies = req.cookies;
  if (!cookies?.access_token && !cookies?.refresh_token)
    return res.sendStatus(401);

  const accessToken = cookies.access_token;
  const refreshToken = cookies.refresh_token;

  if (!accessToken && !refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const user = await verifyAccessToken(accessToken);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" && refreshToken) {
      try {
        const newUser = await verifyRefreshToken(refreshToken);
        req.user = newUser;
        next();
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError);
        return res.sendStatus(403);
      }
    } else {
      console.error("JWT verification error:", err);
      return res.sendStatus(403);
    }
  }
}

async function verifyAccessToken(token: string): Promise<User> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: JsonWebTokenError | null, user: User | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      }
    );
  });
}

async function verifyRefreshToken(token: string): Promise<User> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_REFRESH as string,
      (err: JsonWebTokenError | null, user: User | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      }
    );
  });
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
