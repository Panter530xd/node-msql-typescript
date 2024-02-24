import express, { Request, Response } from "express";
import dotenv from "dotenv";
import academyRoutes from "./routes/academyRoutes";
import groupRoutes from "./routes/groupRoutes";
import foodRoutes from "./routes/foodRoutes";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { authenticateToken, isAdmin, isUser } from "./authMiddleware";
import cookieParser from "cookie-parser";
import registrationRoutes from "./routes/registrationRoutes";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use("/api", academyRoutes);
app.use("/api", groupRoutes);
app.use("/api", foodRoutes);
app.use("/api/users", userRoutes);
app.use("/api", registrationRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  res.send({
    data: req.body,
  });
});

app.get("/api/verify", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
