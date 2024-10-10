import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 返り値の型をPromise<void>に修正(async関数であるため)
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    res.status(401).json({ error: "トークンがありません" });
    return; //関数を終了させる
  }

  try {
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    req.user = decodedToken;
    next(); // next()を呼び出して次のミドルウェアへ
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "無効なトークンです" });
    return; //関数を終了させる
  }
};
