import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import authRoutes from "./routes/auth";
import saunaFacilityRoutes from "./routes/Facilities";
import mealsRoutes from "./routes/Meals";
import reviewRoutes from "./routes/review";

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

//ユーザー認証ルートを追加
app.use("/api/auth", authRoutes);
//サウナ施設ルート
app.use("/api/sauna-facilities", saunaFacilityRoutes);
//
app.use("/api/sauna-meals", mealsRoutes);
//
app.use("/api/reviews", reviewRoutes);

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
