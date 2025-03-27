import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import prisma from "../utlis/prisma";

const router = express.Router();

//サウナ飯の登録
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name, description, price, facilityId, imageUrl } = req.body;
  try {
    const createMealData = await prisma.saunaMeal.create({
      data: {
        name,
        description,
        price,
        facilityId,
        imageUrl,
      },
    });
    res.status(201).json(createMealData);
  } catch (error) {
    res.status(400).json({ error: "mealの作成に失敗" });
  }
});

//一覧取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const getMealData = await prisma.saunaMeal.findMany({
      include: {
        facility: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
    res.json(getMealData);
  } catch (error) {
    res.status(500).json({ error: "mealListの取得に失敗しました" });
  }
});

//特定の飯を取得
router.get("/facility/:facilityId", async (req: any, res: any) => {
  console.log("Request params:", req.params);
  console.log("Request query:", req.query);

  const facilityId = req.params.facilityId;

  if (!facilityId) {
    return res.status(400).json({ error: "facilityIdが必要" });
  }

  try {
    const saunaMealDetail = await prisma.saunaMeal.findMany({
      where: { facilityId },
      include: { facility: true },
    });
    res.json(saunaMealDetail);
  } catch (error) {
    res.status(500).json({ error: "サウナ飯の取得に失敗しました" });
  }
});

// 特定のサウナ飯の詳細を取得
router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const saunaMeal = await prisma.saunaMeal.findUnique({
      where: { id },
      include: {
        facility: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!saunaMeal) {
      return res.status(404).json({ error: "サウナ飯が見つかりません" });
    }

    res.json(saunaMeal);
  } catch (error) {
    res.status(500).json({ error: "サウナ飯の取得に失敗しました" });
  }
});

//編集
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updateMeals = await prisma.saunaMeal.update({
      where: { id },
      data: { name, description, price },
    });
    res.json(updateMeals);
  } catch (error) {
    res.status(400).json({ error: "mealの更新に失敗しました" });
  }
});

export default router;
