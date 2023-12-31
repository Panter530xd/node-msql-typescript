import bcrypt from "bcrypt";
import { databaseConection } from "../config/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

export async function registerUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const sql = `INSERT INTO users (email, password, role, terms_agreement) VALUES (?, ?, ?, ?)`;
    const termsAgreement = true;
    const defaultRole = "user";
    await databaseConection(sql, [
      email,
      hashedPassword,
      defaultRole,
      termsAgreement,
    ]);

    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const [userResult] = await databaseConection(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!Array.isArray(userResult) || userResult.length === 0) {
      return null;
    }

    const user = userResult[0];

    if (!user || !("password" in user)) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_REFRESH as string,
      { expiresIn: "1d" }
    );

    await saveRefreshToken(user.id, refreshToken);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("Generated Refresh Token", refreshToken);
    console.log("Generated accessToken", accessToken);

    res.json({ accessToken, role: user.role, id: user.id, email: user.email });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
}

async function saveRefreshToken(
  userId: number,
  refreshToken: string
): Promise<void> {
  const insertRefreshToken = `
    INSERT INTO refresh_tokens (user_id, token)
    VALUES (?, ?)
  `;

  try {
    await databaseConection(insertRefreshToken, [userId, refreshToken]);
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw error;
  }
}
