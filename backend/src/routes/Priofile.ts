import express, { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// プロフィールの取得
router.get(
  "/me",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: "認証が必要です" });
      return;
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
      if (!getUserProfile) {
        res.status(404).json({ error: "ユーザーが見つかりません" });
        return;
      }
      res.json(getUserProfile);
    } catch (error) {
      next(error);
    }
  }
);

// ユーザーが投稿したレビュー一覧
router.get(
  "/me/reviews",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ error: "認証が必要です" });
      return;
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
          createdAt: "desc",
        },
      });
      res.json(myReviews);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
