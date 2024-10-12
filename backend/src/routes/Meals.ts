import express, { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

//サウナ飯の登録
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { name, description, price, facilityId } = req.body;
  try {
    const createMealData = await prisma.saunaMeal.create({
      data: {
        name,
        description,
        price,
        facilityId,
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
router.get("/facility/:facilityId", async (res: Response, req: Request) => {
  const { facilityId } = req.params;

  try {
    const saunaMealDetail = await prisma.saunaMeal.findMany({
      where: { facilityId },
      include: { facility: true },
    });
    res.json(saunaMealDetail);
  } catch (error) {
    res.status(500).json({ error: "mealの取得に失敗しました" });
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
