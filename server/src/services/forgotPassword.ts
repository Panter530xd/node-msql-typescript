import { databaseConection } from "../config/database";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import transporter from "../config/nodemailerConfig";
dotenv.config();

export async function ForgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const [userResult] = await databaseConection(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!Array.isArray(userResult) || userResult.length === 0) {
    return res.status(404).json({ message: "User not found." });
  }

  const user = userResult[0];

  if (!user || !("password" in user)) {
    return res.status(400).json({ message: "Invalid user data." });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_TOKEN as string,
    { expiresIn: "1d" }
  );

  const resetLink = `http://localhost:5173/reset-password/${user.id}/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    text: `Click on the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending password reset email." });
  }
}
