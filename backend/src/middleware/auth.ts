import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "トークンがありません" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // このuserはtypes/express/index.d.ts内で型定義
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "無効なトークンです" });
  }
};
