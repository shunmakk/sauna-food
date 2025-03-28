import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import authRoutes from "./routes/auth";
import saunaFacilityRoutes from "./routes/Facilities";
import mealsRoutes from "./routes/Meals";
import reviewRoutes from "./routes/review";
import profileRoutes from "./routes/Priofile";

config();

const app = express();
//ミドルウェア
app.use(
  cors({
    origin: "http://localhost:3000", // フロントエンドのURL
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API" });
});

//ユーザー認証ルート
app.use("/api/auth", authRoutes);
//サウナ施設ルート
app.use("/api/sauna-facilities", saunaFacilityRoutes);
//サウナ飯ルート
app.use("/api/sauna-meals", mealsRoutes);
//レビュールート
app.use("/api/reviews", reviewRoutes);
//プロフィールルート
app.use("/api/users", profileRoutes);

// エラーハンドリング
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
