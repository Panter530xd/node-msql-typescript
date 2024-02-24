import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { registerUser, loginUser } from "../services/usersService";
import { authenticateTokenMiddleware } from "../authMiddleware";
import { databaseConection } from "../config/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();
router.use(express.json());
router.use(cookieParser());
dotenv.config();

interface RefreshTokenResult {
  token: string;
}

interface DecodedToken {
  id: string;
  email: string;
  exp?: number;
  role: string;
}
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    await registerUser(email, password);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.post("/login", loginUser);

router.get("/refresh", async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(401);
  const refreshToken = cookies.refresh_token;

  try {
    if (!refreshToken) {
      console.error("No refresh token found in cookies");
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH as string
    ) as DecodedToken;

    console.log("Decoded Refresh Token:", decoded);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      console.error("Refresh token has expired");
      return res.sendStatus(401);
    }

    const storedRefreshToken = await getRefreshTokenFromDb(decoded.id);

    const userRole = await getUserRoleFromDb(decoded.id);

    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      console.error("Invalid or mismatched refresh token");
      return res.sendStatus(403);
    }
    console.log("Payload before signing:", {
      id: decoded.id,
      email: decoded.email,
      role: userRole,
    });

    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: userRole },
      process.env.JWT_SECRET as string,
      { expiresIn: "5m" }
    );
    console.log("Access Token:", accessToken);

    res.json({
      accessToken,
      email: decoded.email,
      role: userRole,
      id: decoded.id,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.sendStatus(403);
  }
});

async function getRefreshTokenFromDb(userId: string): Promise<string | null> {
  const selectRefreshToken = `
    SELECT token FROM refresh_tokens
    WHERE user_id = ?
  `;

  try {
    const [result, _fields] = await databaseConection(selectRefreshToken, [
      userId,
    ]);
    return (result as RefreshTokenResult[])[0]?.token || null;
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
    return null;
  }
}

router.post(
  "/logout",
  authenticateTokenMiddleware,
  async (req: Request, res: Response) => {
    const userId = (req.user as { id: string }).id;

    res.clearCookie("refresh_token");
    res.clearCookie("access_token");

    try {
      await removeRefreshTokenFromDb(userId);

      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

async function removeRefreshTokenFromDb(userId: string): Promise<void> {
  const deleteRefreshToken = `
    DELETE FROM refresh_tokens
    WHERE user_id = ?
  `;

  try {
    await databaseConection(deleteRefreshToken, [userId]);
  } catch (error) {
    console.error("Error removing refresh token from the database:", error);
    throw error;
  }
}

async function getUserRoleFromDb(userId: string): Promise<string | null> {
  const selectUserRole = `
    SELECT role FROM users
    WHERE id = ?
  `;

  try {
    const [result, _fields] = await databaseConection(selectUserRole, [userId]);
    return (result as { role: string }[])[0]?.role || null;
  } catch (error) {
    console.error("Error retrieving user role:", error);
    return null;
  }
}

export default router;
