import express from "express";
import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";
import admin from "../config/firebaseAdmin";

//認証ルート
const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        // id: userRecord.uid,
        name,
        email,
        passwordHash,
      },
    });

    res.status(201).json({ message: "ユーザーの作成に成功", userId: user.id });
  } catch (error) {
    console.error("ユーザーの作成に失敗:", error);
    res.status(400).json({ error: "ユーザー作成エラー" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ token: customToken });
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

export default router;
