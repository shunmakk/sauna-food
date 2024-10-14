import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//プロフィールの取得
router.get("/me", authMiddleware, async (res: any, req: any) => {
  const userId = req.user?.uid;

  if (!userId) {
    return res.status(400).json({ error: "認証している必要があります" });
  }

  try {
    const getUserProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    res.json(getUserProfile);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "あなたのprofileの取得に失敗しました" });
  }
});

//userが投稿したレビュー一覧
router.get("/review/me", authMiddleware, async (res: any, req: any) => {
  const userId = req.user?.uid;

  if (!userId) {
    return res.status(400).json({ error: "認証している必要" });
  }

  try {
    const myReviews = await prisma.review.findMany({
      where: { userId: userId },
      include: {
        saunaMeal: {
          include: {
            facility: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", //投稿した順（取り敢えず）
      },
    });
    res.json(myReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "my投稿の取得に失敗しました" });
  }
});
