import bcrypt from "bcrypt";
import { databaseConection } from "../config/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function registerUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (email, password, terms_agreement) VALUES (?, ?, ?)`;
    const termsAgreement = true;
    await databaseConection(sql, [email, hashedPassword, termsAgreement]);

    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<string | null> {
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
      return "Invalid user data";
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!passwordMatch) {
      return null;
    }

    const today = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const tomorrow = today + oneDay;

    const token = jwt.sign(
      { exp: tomorrow, id: user.id, email: user.email },
      process.env.JWT_SECRET as string
    );

    return token;
  } catch (error) {
    console.error("Error during login:", error);
    return "An error occurred";
  }
}
