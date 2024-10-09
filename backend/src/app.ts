import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import authRoutes from "./routes/auth";

config();

const app = express();

//ミドルウェア
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//ルート
app.get("/", (req, res) => {
  res.json({ message: "API" });
  app.use("/api/auth", authRoutes);
});

//エラーハンドリング
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "500エラー" });
  }
);

export default app;
