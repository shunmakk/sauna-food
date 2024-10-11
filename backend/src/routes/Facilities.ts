import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

//登録
router.post("/", authMiddleware, async (req: any, res: any) => {
  const { name, address, description } = req.body;
  const createdById = req.user?.uid;

  if (!createdById) {
    return res
      .status(401)
      .json({ error: "認証に失敗しました(ユーザーがいない可能性あり)" });
  }

  try {
    const makeSaunaFaciltiy = await prisma.saunaFacility.create({
      data: {
        name,
        address,
        description,
        createdBy: {
          connect: { id: createdById },
        },
      },
    });
    res.status(201).json(makeSaunaFaciltiy);
  } catch (e) {
    console.error(e); // エラーの詳細をログに出力
    res.status(400).json({ error: "サウナ施設のデータ作成失敗" });
  }
});

//取得(一覧)
router.get("/", async (req: Request, res: Response) => {
  try {
    const getSaunaFaciltiesList = await prisma.saunaFacility.findMany({
      include: { createdBy: { select: { name: true } } },
    });
    res.json(getSaunaFaciltiesList);
  } catch (e) {
    res.status(500).json({ error: "サウナ施設一覧取得失敗" });
  }
});

//取得(特定)
router.get("/:id", async (req: Request, res: Response) => {
  //FE側のidを取得
  const { id } = req.params;
  try {
    const getSpecificFaciltiy = await prisma.saunaFacility.findUnique({
      where: { id },
      include: {
        createdBy: { select: { name: true } },
        saunaMeals: true,
      },
    });
    if (getSpecificFaciltiy) {
      res.json(getSpecificFaciltiy);
    } else {
      res.status(400).json({ error: "サウナ施設が見つかりません" });
    }
  } catch (e) {
    res.status(500).json({ e: "サウナ施設の取得に失敗" });
  }
});

//編集
router.put("/:id", authMiddleware, async (req: any, res: any) => {
  const { id } = req.params;
  const { name, address, description } = req.body;
  const userId = req.user?.uid;

  try {
    const editSaunaFaciltiy = await prisma.saunaFacility.findUnique({
      where: { id },
    });
    if (!editSaunaFaciltiy || editSaunaFaciltiy.createdById !== userId) {
      return res.status(403).json({ error: "編集権限エラー" });
    }
    const updatedSaunaFaciltiy = await prisma.saunaFacility.update({
      where: { id },
      data: { name, address, description },
    });
    res.json(updatedSaunaFaciltiy);
  } catch (e) {
    res.status(400).json({ error: "編集に失敗！" });
  }
});

//削除
router.delete("/:id", authMiddleware, async (req: any, res: any) => {
  const { id } = req.params;
  const userId = req.user?.uid;

  try {
    const deleteSaunaFaclity = await prisma.saunaFacility.findUnique({
      where: { id },
    });
    if (!deleteSaunaFaclity || deleteSaunaFaclity.createdById !== userId) {
      return res.status(403).json({ error: "削除権限エラー" });
    }

    await prisma.saunaFacility.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: "削除に失敗！" });
  }
});

export default router;
