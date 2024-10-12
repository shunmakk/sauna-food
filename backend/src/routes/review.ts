import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { error } from "console";

const router = express.Router();
const prsima = new PrismaClient();

//投稿
router.post("/", authMiddleware, async (req: any, res: Response) => {
  const {
    overallRating,
    tasteRating,
    valueRating,
    comment,
    saunaMealId,
    imageUrl,
  } = req.body;
  const userId = req.user?.uid;

  try {
    const createReview = await prsima.review.create({
      data: {
        overallRating,
        tasteRating,
        valueRating,
        comment,
        imageUrl,
        userId,
        saunaMealId,
      },
    });
    res.status(201).json(createReview);
  } catch (error) {
    res.status(400).json({ error: "レビューの投稿に成功" });
  }
});

//特定の飯に対するレビュー一覧
router.get("/saunaMeal/:saunaMealId", async (req: any, res: any) => {
  const { saunaMealId } = req.params;
  try {
    const getSpecificMealsReview = await prsima.review.findMany({
      where: { saunaMealId },
      include: {
        user: true,
      },
    });
    res.json(getSpecificMealsReview);
  } catch (error) {
    res.status(500).json({ error: "特定の飯に対するレビュー一覧に失敗" });
  }
});

//特定のレビューを取得
router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const getSpecificReview = await prsima.review.findUnique({
      where: { id },
      include: { user: true, saunaMeal: true },
    });
    if (getSpecificReview) {
      res.json(getSpecificReview);
    } else {
      res.status(404).json({ error: "レビューが見つかりません" });
    }
  } catch (error) {
    res.json(500).json({ error: "レビューの取得に失敗" });
  }
});
