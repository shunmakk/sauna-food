import express, { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import admin from "../config/firebaseAdmin"; // Firebase Admin SDK
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

// ユーザー登録エンドポイント（IDトークンを使ったユーザー作成）
router.post(
  "/register",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const { uid } = res.locals; // verifyTokenミドルウェアでuidを取得

    try {
      // Prismaでユーザーをデータベースに保存
      const user = await prisma.user.create({
        data: {
          id: uid, // FirebaseのUIDを使う
          email,
          name,
          passwordHash: "", // フロントで管理しているため不要
        },
      });

      res.status(201).json({ message: "ユーザーが作成されました", user });
    } catch (error) {
      console.error("ユーザーの作成に失敗:", error);
      res.status(500).json({ error: "サーバーエラー" });
    }
  }
);

// ミドルウェア：トークンを検証し、Firebase UIDを取得
export const verifyToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "トークンがありません" });
  }

  try {
    // Firebase Admin SDKでトークンを検証し、ユーザー情報を取得
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals.uid = decodedToken.uid; // UIDを次の処理に渡す
    next();
  } catch (error) {
    console.error("トークンの検証に失敗:", error);
    res.status(403).json({ error: "無効なトークンです" });
  }
};

export default router;
