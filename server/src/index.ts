import express, { Request, Response } from "express";
import dotenv from "dotenv";
import academyRoutes from "./routes/academyRoutes";
import groupRoutes from "./routes/groupRoutes";
import foodRoutes from "./routes/foodRoutes";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", academyRoutes);
app.use("/api", groupRoutes);
app.use("/api", foodRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  res.send({
    data: req.body,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
