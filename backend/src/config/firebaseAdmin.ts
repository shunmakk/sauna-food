import admin from "firebase-admin";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config();

// 環境変数の設定を読み込み
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_PATHが設置されていない");
}

// フルパスの解決
const fullPath = path.resolve(__dirname, "../../", serviceAccountPath);
console.log("フルパスのアカウントキー:", fullPath);

try {
  const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("FirebaseAdminの初期化に成功しました!");
  }
} catch (error: any) {
  console.error(
    "アカウントキーの読み取りまたは解析中にエラーが発生しました",
    error.message
  );
  throw new Error("サービスアカウントキーのロードに失敗");
}

export default admin;
