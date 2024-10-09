import express, { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import admin from "../config/firebaseAdmin";

//認証ルート
const router = express.Router();
const prisma = new PrismaClient();

// ユーザー登録エンドポイント
router.post("/register", async (req: any, res: any) => {
  const { email, name } = req.body;

  try {
    // Prismaでユーザー情報をデータベースに保存
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: "", // パスワードハッシュは不要
      },
    });

    return res.status(201).json({ message: "ユーザーが作成されました", user });
  } catch (error) {
    console.error("ユーザーの作成に失敗:", error);
    return res.status(500).json({ error: "サーバーエラー" });
  }
});

// メールアドレスの存在チェックエンドポイント
router.post("/check-email", async (req: any, res: any) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("メールアドレスのチェックに失敗:", error);
    return res.status(500).json({ error: "サーバーエラー" });
  }
});

//ログインユーザーを登録するエンドポイント
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ token: customToken });
  } catch (error) {
    res.status(400).json({ error: "無効な認証" });
  }
});

export default router;
