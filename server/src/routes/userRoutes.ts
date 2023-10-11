import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { registerUser, loginUser } from "../services/employerService";
import { authenticateToken } from "../authMiddleware";

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

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

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);

    if (token !== null) {
      console.log("Login successful for email:", email);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({ message: "Login successful" });
    } else {
      console.log("Invalid credentials for email:", email);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", authenticateToken, (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

export default router;
